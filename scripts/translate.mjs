/**
 * AI-oversettelsesscript for Sanity-innhold
 *
 * Bruk:
 *   1. Sett ANTHROPIC_API_KEY og SANITY_TOKEN som miljøvariabler
 *   2. Kjør: node scripts/translate.mjs
 *
 * Scriptet oversetter norsk innhold til engelsk og skriver tilbake til Sanity.
 * Eksisterende engelske felt overskrives IKKE hvis de allerede har innhold.
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@sanity/client';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const sanity = createClient({
  projectId: '7izj8dsr',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN ?? process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function translate(text) {
  if (!text || (typeof text === 'string' && text.trim() === '')) return null;

  const content = typeof text === 'string' ? text : JSON.stringify(text);

  const msg = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Translate the following Norwegian text to English. Return ONLY the translated text, no explanations or quotes.\n\n${content}`,
    }],
  });

  return msg.content[0].text.trim();
}

async function translateBlocks(blocks) {
  if (!blocks || blocks.length === 0) return null;
  const plainText = blocks
    .map(b => b.children?.map(c => c.text).join('') ?? '')
    .join('\n\n');
  const translated = await translate(plainText);
  // Return as simple single block for now — manual editing in Studio for rich formatting
  return [{
    _type: 'block',
    _key: 'translated',
    style: 'normal',
    children: [{ _type: 'span', _key: 'span', text: translated, marks: [] }],
    markDefs: [],
  }];
}

async function translateArray(arr) {
  if (!arr || arr.length === 0) return null;
  return Promise.all(arr.map(item => translate(item)));
}

async function translateHomePage() {
  const doc = await sanity.fetch(`*[_type == "homePage"][0]`);
  if (!doc) return console.log('Ingen homePage funnet');

  const patch = sanity.patch(doc._id);
  const fields = [
    'heroHeading', 'heroSubheading', 'introHeading', 'introText',
    'ctaHeading', 'ctaText', 'ctaButtonText', 'title',
  ];

  for (const field of fields) {
    const enField = `${field}_en`;
    if (doc[enField]) { console.log(`  Hopper over ${enField} (har allerede innhold)`); continue; }
    if (!doc[field]) continue;
    console.log(`  Oversetter ${field}...`);
    const translated = await translate(doc[field]);
    if (translated) patch.set({ [enField]: translated });
  }

  await patch.commit();
  console.log('✓ homePage oversatt');
}

async function translateServices() {
  const services = await sanity.fetch(`*[_type == "service"]`);
  console.log(`\nOversetter ${services.length} tjenester...`);

  for (const svc of services) {
    console.log(`\n  Tjeneste: ${svc.title}`);
    const patch = sanity.patch(svc._id);

    if (!svc.title_en && svc.title) {
      console.log('    Oversetter title...');
      patch.set({ title_en: await translate(svc.title) });
    }
    if (!svc.shortDescription_en && svc.shortDescription) {
      console.log('    Oversetter shortDescription...');
      patch.set({ shortDescription_en: await translate(svc.shortDescription) });
    }
    if (!svc.fullDescription_en && svc.fullDescription) {
      console.log('    Oversetter fullDescription...');
      patch.set({ fullDescription_en: await translateBlocks(svc.fullDescription) });
    }
    if (!svc.features_en && svc.features) {
      console.log('    Oversetter features...');
      patch.set({ features_en: await translateArray(svc.features) });
    }

    await patch.commit();
    console.log(`  ✓ ${svc.title} ferdig`);
  }
}

async function translateAboutPage() {
  const doc = await sanity.fetch(`*[_type == "aboutPage"][0]`);
  if (!doc) return console.log('Ingen aboutPage funnet');

  const patch = sanity.patch(doc._id);

  const stringFields = ['heroHeading', 'heroText', 'historyHeading', 'valuesHeading', 'teamHeading'];
  for (const field of stringFields) {
    const enField = `${field}_en`;
    if (doc[enField]) { console.log(`  Hopper over ${enField}`); continue; }
    if (!doc[field]) continue;
    console.log(`  Oversetter ${field}...`);
    patch.set({ [enField]: await translate(doc[field]) });
  }

  if (!doc.historyText_en && doc.historyText) {
    console.log('  Oversetter historyText...');
    patch.set({ historyText_en: await translateBlocks(doc.historyText) });
  }

  if (!doc.values_en && doc.values?.length > 0) {
    console.log('  Oversetter values...');
    const valuesEn = await Promise.all(doc.values.map(async (v) => ({
      ...v,
      title: await translate(v.title),
      description: await translate(v.description),
    })));
    patch.set({ values_en: valuesEn });
  }

  await patch.commit();
  console.log('✓ aboutPage oversatt');
}

async function translateAuthors() {
  const authors = await sanity.fetch(`*[_type == "author"]`);
  console.log(`\nOversetter ${authors.length} forfattere...`);
  for (const author of authors) {
    const patch = sanity.patch(author._id);
    if (!author.position_en && author.position) {
      console.log(`  ${author.name}: oversetter position...`);
      patch.set({ position_en: await translate(author.position) });
    }
    if (!author.bio_en && author.bio) {
      console.log(`  ${author.name}: oversetter bio...`);
      patch.set({ bio_en: await translate(author.bio) });
    }
    await patch.commit();
  }
  console.log('✓ Forfattere oversatt');
}

async function translateTeamMembers() {
  const members = await sanity.fetch(`*[_type == "teamMember"]`);
  console.log(`\nOversetter ${members.length} teammedlemmer...`);
  for (const member of members) {
    const patch = sanity.patch(member._id);
    if (!member.position_en && member.position) {
      console.log(`  ${member.name}: oversetter position...`);
      patch.set({ position_en: await translate(member.position) });
    }
    if (!member.bio_en && member.bio) {
      console.log(`  ${member.name}: oversetter bio...`);
      patch.set({ bio_en: await translate(member.bio) });
    }
    await patch.commit();
  }
  console.log('✓ Teammedlemmer oversatt');
}

async function main() {
  console.log('Starter AI-oversettelse...\n');
  console.log('homePage:');
  await translateHomePage();
  await translateServices();
  console.log('\naboutPage:');
  await translateAboutPage();
  await translateAuthors();
  await translateTeamMembers();
  console.log('\nFerdig! Sjekk Sanity Studio for å se og justere oversettelsene.');
}

main().catch(console.error);
