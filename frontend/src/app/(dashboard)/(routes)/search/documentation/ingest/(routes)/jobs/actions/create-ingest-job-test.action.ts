'use server';

export default async function createIngestJobTest(previousState, formData) {
  const result = {
    id: '018204a2-9e58-4618-affe-e313be132aee',
    phrase: 'How do I install the theme? 222',
    method: 'semantic',
    metric: 'cosine',
    chunks: [
      {
        id: '018204a2-9e48-4618-affe-e313be132aee',
      },
      {
        id: '018204a2-9e58-4618-affe-e313be182aee',
      },
    ],
  };

  return { success: true, tests: [...previousState, result] };
}
