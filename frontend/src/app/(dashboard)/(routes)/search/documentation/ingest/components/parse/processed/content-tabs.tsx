import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function DocumentationIngestParseProcessedContentTabs() {
  const testVlaue = `# Markdown syntax guide

## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b
    * Item 3a
    * Item 3b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![This is an alt text.](/image/Markdown-mark.svg "This is a sample image.")

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

## Inline code
`;

  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="markdown" className="cursor-pointer">
          Markdown
        </TabsTrigger>
        <TabsTrigger value="plain-text" className="cursor-pointer">
          Plain text
        </TabsTrigger>
      </TabsList>
      <TabsContent value="markdown">
        <Textarea id="parsed-markdown" value={testVlaue} disabled className="max-h-100 opacity-100!" />
      </TabsContent>
      <TabsContent value="plain-text">
        <Textarea id="parsed-plain-text" value={testVlaue} disabled className="max-h-100 opacity-100!" />
      </TabsContent>
    </Tabs>
  );
}
