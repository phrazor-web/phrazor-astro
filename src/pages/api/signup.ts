import type { APIRoute } from 'astro';
import { createClient } from '@sanity/client';
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

const client = createClient({
  projectId: '7s24sjw8',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  token:
    'sk3Fud9W7oeUQXtQifbyJZW0hnuoYFNER7JYQLEdnyI30765ZiFhBcS0Joa6Dx6qj443I6h8ocye263y05XekzJliXNl0JZtVSSpFHRF9EgPEWbh33B1vTy28qn4TAArXaGzpOMPa2A9svUehKLgXB3pKpgqDIDcUMSb5LgYWutNw0OMCLTZ',
});
export const post: APIRoute = async ({ request }) => {
  const { email } = await request.json();

  // Validate the data - you'll probably want to do more than this
  if (!email) {
    return new Response(
      JSON.stringify({
        message: 'Missing email',
      }),
      { status: 400 }
    );
  }
  const user = await client.create({
    _type: 'user',
    email,
  });
  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      message: 'Success!',
      user,
    }),
    { status: 200 }
  );
};
