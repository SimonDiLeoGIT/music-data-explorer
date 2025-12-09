export const HtmlRenderer: React.FC<{ text: string }> = ({ text }) => {
  
  const linkMatch = text.match(/<a href="([^"]+)">([^<]+)<\/a>/);
  
  if (!linkMatch) {
    return <p className="text-zinc-400 text-sm">{text}</p>;
  }
  
  const [fullMatch, url, linkText] = linkMatch;
  const beforeLink = text.substring(0, text.indexOf(fullMatch));
  
  return (
    <p className="text-zinc-400 text-sm">
      {beforeLink}
      <a 
        href={url} 
        target="_blank" 
        rel="noreferrer"
        className="text-purple-400 hover:underline"
      >
        {linkText}
      </a>
    </p>
  );
};