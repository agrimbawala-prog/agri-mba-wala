type FAQProps = {
  items: [string, string][];
};

export function FAQ({ items }: FAQProps) {
  return (
    <div className="faq-list">
      {items.map(([question, answer], index) => (
        <details key={question} className="faq-item" open={index === 0}>
          <summary>{question}<span aria-hidden="true">+</span></summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
