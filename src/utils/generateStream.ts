const LOREM_SENTENCES = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    'Excepteur sint occaecat cupidatat non proident.',
    'Analysis of the data reveals significant anomalies in the sector.',
    'Therefore, we must recommend a strategy of immediate optimization.',
    'Implementation details are discussed in the following section.',
]

const CODE_SNIPPETS = [
    `function calculateHash(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}`,
    `const App = () => {
  const [state, setState] = useState(null);
  useEffect(() => {
    fetchData().then(setState);
  }, []);
  return <div>{state}</div>;
}`,
    `SELECT * FROM users 
WHERE created_at > NOW() - INTERVAL '1 day'
ORDER BY id DESC;`,
    `input {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}`,
]

export const generateStream = (onChunk: (chunk: string) => void, shouldStop: () => boolean, targetWords = 1000) => {
    let currentWordCount = 0
    let isCodeMode = false
    let currentCodeSnippetLines: string[] = []

    const timer = setInterval(() => {
        if (shouldStop() || currentWordCount >= targetWords) {
            clearInterval(timer)
            return
        }

        let chunk = ''

        if (isCodeMode) {
            if (currentCodeSnippetLines.length > 0) {
                const line = currentCodeSnippetLines.shift()
                chunk = line + '\n'
                currentWordCount += line!.split(' ').length
            } else {
                chunk = '```\n\n'
                isCodeMode = false
            }
        } else {
            const wantCode = Math.random() > 0.9

            if (wantCode) {
                isCodeMode = true
                const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]
                currentCodeSnippetLines = snippet.split('\n')
                chunk = '\n\nВот пример кода:\n```typescript\n'
                currentWordCount += 5
            } else {
                const sentence = LOREM_SENTENCES[Math.floor(Math.random() * LOREM_SENTENCES.length)]

                chunk = sentence + ' '
                currentWordCount += sentence.split(' ').length
            }
        }

        onChunk(chunk)
    }, 20)
}
