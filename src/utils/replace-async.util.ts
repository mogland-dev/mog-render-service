export async function replaceAsync(
  text: string,
  regex: RegExp,
  asyncReplacer: (match: string, ...args: any[]) => Promise<string>
): Promise<string> {
  const promises: Promise<string>[] = [];
  text.replace(regex, (match, ...args) => {
    promises.push(asyncReplacer(match, ...args));
    return match;
  });
  const data = await Promise.all(promises);
  return text.replace(regex, () => data.shift() as string);
}
