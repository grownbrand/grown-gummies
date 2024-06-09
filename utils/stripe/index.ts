export async function streamToJson(stream: ReadableStream): Promise<any> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let result = "";
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    result += decoder.decode(value || new Uint8Array(), { stream: !done });
  }

  return JSON.parse(result);
}

export function parseTags(input: string): string[] {
  if (input && input.includes(",")) {
    return input.split(",").map((item) => item.trim().replace(/\s/g, "-"));
  } else {
    return [input && input.replace(/\s/g, "-")];
  }
}
