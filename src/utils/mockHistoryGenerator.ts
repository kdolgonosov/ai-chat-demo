import type { Message } from '@/store/chatStore'

const PARAGRAPHS = [
    "The mitochondria is often referred to as the powerhouse of the cell. It generates most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy.",
    "In 1969, the Apollo 11 mission successfully landed humans on the Moon. Neil Armstrong became the first person to step onto the lunar surface, famously describing the event as 'one small step for man, one giant leap for mankind'.",
    "Dostoevsky's 'Crime and Punishment' explores the mental anguish and moral dilemmas of Rodion Raskolnikov, an impoverished ex-student in Saint Petersburg who formulates a plan to kill an unscrupulous pawnbroker.",
    'Quantum entanglement is a physical phenomenon that occurs when a group of particles are generated, interacted, or shared spatial proximity in a way that such that the quantum state of each particle cannot be described independently.',
    'The rapid expansion of the Mongol Empire in the 13th century was facilitated by their superior cavalry tactics, discipline, and the adaptability of their military strategy across different terrains.',
    'Machine learning algorithms build a model based on sample data, known as training data, in order to make predictions or decisions without being explicitly programmed to do so.',
]

const CODE_SNIPPETS = [
    `\`\`\`python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
\`\`\``,
    `\`\`\`sql
SELECT u.username, COUNT(o.id) as total_orders
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed'
AND o.created_at >= DATE('now', '-30 days')
GROUP BY u.username
HAVING total_orders > 5
ORDER BY total_orders DESC;
\`\`\``,
    `\`\`\`json
{
  "project": "apollo-server",
  "version": "1.0.0",
  "settings": {
    "timeout": 5000,
    "retry": true,
    "database": {
      "host": "192.168.1.5",
      "port": 5432
    }
  }
}
\`\`\``,
    `\`\`\`go
package main

import "fmt"

func main() {
    messages := make(chan string)
    go func() { messages <- "ping" }()
    msg := <-messages
    fmt.Println(msg)
}
\`\`\``,
]

const LISTS = [
    '- Mercury\n- Venus\n- Earth\n- Mars\n- Jupiter',
    '1. Flour\n2. Sugar\n3. Eggs\n4. Butter\n5. Vanilla extract',
    '- **S&P 500**: Market Cap Weighted\n- **Dow Jones**: Price Weighted\n- **Nasdaq**: Tech heavy',
    '1. Define the problem\n2. Gather data\n3. Analyze results\n4. Draw conclusions',
]

function getRandomParagraph() {
    const p = PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)]
    // Иногда склеиваем два параграфа для объема
    return Math.random() > 0.5 ? p : p + ' ' + PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)]
}

function getRandomCodeBlock() {
    return CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]
}

function getRandomList() {
    return LISTS[Math.floor(Math.random() * LISTS.length)]
}

function generateUserMessage() {
    const questions = [
        'Write a Python script to sort an array.',
        'Explain the significance of the French Revolution.',
        'How does a neural network learn?',
        'Give me a recipe for chocolate cake.',
        'What is the difference between TCP and UDP?',
        'Analyze the themes in Hamlet.',
        'Write a SQL query to find top users.',
    ]
    return questions[Math.floor(Math.random() * questions.length)]
}

function generateAiResponse(size: 'medium' | 'massive') {
    let content = ''
    // massive = 30-50 блоков
    // medium = 2-5 блоков
    const blocksCount = size === 'massive' ? Math.floor(Math.random() * 20) + 30 : Math.floor(Math.random() * 3) + 2

    for (let i = 0; i < blocksCount; i++) {
        const type = Math.random()

        if (type > 0.8) {
            content += getRandomCodeBlock() + '\n\n'
        } else if (type > 0.6) {
            content += getRandomList() + '\n\n'
        } else if (type > 0.5 && i > 0) {
            content += `### Chapter ${i + 1}: Detailed Analysis\n\n`
        } else {
            content += getRandomParagraph() + '\n\n'
        }
    }

    return content
}

export const generateMockHistory = (): Message[] => {
    return Array.from({ length: 100 }).map((_, i) => {
        const isUser = i % 2 === 0
        // Каждое 7-е сообщение будет лонгридом
        const isMassive = !isUser && i % 7 === 0

        return {
            id: crypto.randomUUID(),
            role: isUser ? 'user' : 'assistant',
            content: isUser ? generateUserMessage() : generateAiResponse(isMassive ? 'massive' : 'medium'),
        }
    })
}
