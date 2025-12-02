export async function onRequest(context) {

  const { COUNTER_KV, request } = context.env;

  // Read the current counter value from KV
  let count = Number(await COUNTER_KV.get("count")) || 0;

  // If this is a POST request — increment
  if (request.method === "POST") {
    count++;
    await COUNTER_KV.put("count", count);
  }

  // Return result as JSON
  return new Response(JSON.stringify({ count }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });

}
