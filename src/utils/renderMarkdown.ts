export const renderMarkdown = (text: string) => {
    return text
        .replace(/```([\s\S]*?)```/g, '<pre class="bg-neutral-800 p-3 rounded text-xs overflow-auto"><code>$1</code></pre>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}
