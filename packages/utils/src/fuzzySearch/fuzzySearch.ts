/**
 * Calculate Levenshtein Distance between two strings.
 */
function levenshteinDistance(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) {
      (dp[i] as number[])[0] = i;
  }
  for (let j = 0; j <= b.length; j++) {
    (dp[0] as number[])[j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      (dp[i] as number[])[j] = Math.min(
          ((dp[i - 1] as number[])[j] as number) + 1, // Deletion
          ((dp[i] as number[])[j - 1] as number) + 1, // Insertion
          ((dp[i - 1] as number[])[j - 1] as number) + cost // Substitution
      );
    }
  }

  return (dp[a.length] as number[])[b.length] as number;
}

/**
 * Fuzzy match function to filter based on a threshold.
 */
export function fuzzyMatch(query: string, input: string, threshold: number = 0.5): boolean {
  const normalizedQuery = query.toLowerCase();
  const normalizedInput = input.toLowerCase();

  // Calculate Levenshtein distance
  const distance = levenshteinDistance(normalizedQuery, normalizedInput);

  // Determine similarity ratio (1 - normalized distance)
  const maxLen = Math.max(normalizedQuery.length, normalizedInput.length);
  const similarity = 1 - distance / maxLen;

  // Return true if similarity is above or equal to the threshold
  return similarity >= threshold;
}
export function fuzzySubstringMatch(query: string, input: string, threshold: number = 0.5): boolean {
  const normalizedQuery = query.toLowerCase();
  const normalizedInput = input.toLowerCase();

  // If query is longer than input, it's not a match
  if (normalizedQuery.length > normalizedInput.length) {
    return false;
  }

  let minDistance = Infinity;

  // Slide a window of query's length over the input
  for (let i = 0; i <= normalizedInput.length - normalizedQuery.length; i++) {
    const substring = normalizedInput.slice(i, i + normalizedQuery.length);
    const distance = levenshteinDistance(normalizedQuery, substring);
    minDistance = Math.min(minDistance, distance);
  }

  // Calculate similarity ratio
  const similarity = 1 - minDistance / normalizedQuery.length;

  return similarity >= threshold;
}

export type SearchResult = Record<string, {
  matchedString: string;
  similarity: number;
}>

export function fuzzySearchList(
  query: string,
  items: { id: string; value: string }[],
  threshold: number = 0.5
): SearchResult {
  const normalizedQuery = query.toLowerCase();
  const results:Record<string, any> = {};

  for (const item of items) {
    const normalizedInput = item.value.toLowerCase();

    let minDistance = Infinity;
    let bestMatch = "";

    // Sliding window for substring matching
    for (let i = 0; i <= normalizedInput.length - normalizedQuery.length; i++) {
      const substring = normalizedInput.slice(i, i + normalizedQuery.length);
      const distance = levenshteinDistance(normalizedQuery, substring);

      if (distance < minDistance) {
        minDistance = distance;
        bestMatch = substring;
      }
    }

    // Calculate similarity ratio
    const similarity = 1 - minDistance / normalizedQuery.length;

    if (similarity >= threshold) {
      results[item.id] = {
        matchedString: bestMatch,
        similarity: similarity,
      };
    }
  }

  return results;
}
