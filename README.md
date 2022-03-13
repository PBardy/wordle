# Wordle

Yet another copy of the classic language game wordle. This adds lots of different modes and subject specific vocabulary.

## Game Modes

1. Classic - The entire vocabulary of the language selected
2. Exploding Kittens - All exploding kittens related terms (if you lose you explode).

## Difficulties

1. Easy
  1. Not case-sensitive
  2. Punctutation is excluded
  3. The dictionary selected is restricted to words of the chosen size
  4. No. guesses = word length + 2
  5. Words in phrases are space seperated.

2. Normal
  1. Not case sensitive
  2. Punctuation is included
  3. The dictionary selected is restricted to words of the chosen size
  4. No. guesses = word length + 1
  5. Words in phrases are space seperated.

3. Hard
  1. Case sensitive
  2. Punctuation is included
  3. The dictionary selected includes all words of at least the chosen size (shorter words are padded with '-')
  4. No. guesses = word length
  5. Words in phrases are not space seperated.

4. Lead Dev
  1. Case sensitive
  2. Punctuation is included
  3. The dictionary contains all subject specific vocab (words shorter than the longest are padded with '-')
  4. No. guesses = word length - 1
  5. Words in phrases are not space seperated.