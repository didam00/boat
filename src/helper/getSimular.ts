function splitHangul(hangul: string) {
  const cho = [
      'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
      'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
      'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ];

  const jung = [
      'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
      'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
      'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
  ];

  const jong = [
      '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
      'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
      'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
      'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ];

  const startOfHangul = 44032;
  const endOfHangul = 55203;

  const charUnicode = hangul.charCodeAt(0);

  if (charUnicode < startOfHangul || charUnicode > endOfHangul) {
      return [ hangul ];
  }

  const relSize = charUnicode - startOfHangul;

  const choIdx = relSize / 588;
  const jungIdx = (relSize - (choIdx * 588)) / 28;
  const jongIdx = relSize % 28;

  if (jong[jongIdx]) {
      return [
          cho[choIdx],
          jung[jungIdx],
          jong[jongIdx]
      ];
  }
  return [
      cho[choIdx],
      jung[jungIdx]
  ];
}

const getLevenshteinDistance = (a: string, b: string): number => {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        // substitution, insertion, deletion
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

const getSimilarity = (a: string, b: string): number => {
  const distance = getLevenshteinDistance(a, b);
  const longestLength = Math.max(a.length, b.length);
  return (longestLength - distance) / longestLength;
};

const getSimular = (a: string, b: string) => {
  const splitA: string[] = [];
  for (let i = 0; i < a.length; i++) {
    splitA.push(...splitHangul(a[i].replaceAll(" ", "")));
  }

  const splitB: string[] = [];
  for (let i = 0; i < b.length; i++) {
    splitB.push(...splitHangul(b[i].replaceAll(" ", "")));
  }

  const similarity = getSimilarity(splitA.join(''), splitB.join(''));
  
  return similarity;
}

export default getSimular;