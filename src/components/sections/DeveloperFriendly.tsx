import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/ui/terminal"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { 
  TerminalIcon,
  FileCodeIcon,
  FileJsonIcon,
  FileTextIcon,
  BookOpenIcon,
  PackageIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function DeveloperFriendly() {
  const codeExamples = {
    curl: [
      'curl "https://api.imagerouter.io/v1/images/generations" \\',
      '  -H "Authorization: Bearer $IMAGINE_API_KEY" \\',
      '  -H "Content-Type: application/json" \\',
      '  -d \'{"prompt": "A futuristic cityscape at sunset", "model": "stabilityai/stable-diffusion-3"}\''
    ],
    python: [
      'import requests',
      '',
      'response = requests.post(',
      '  "https://api.imagerouter.io/v1/images/generations",',
      '  headers={',
      '    "Authorization": f"Bearer {os.environ[\'IMAGINE_API_KEY\']}",',
      '    "Content-Type": "application/json"',
      '  },',
      '  json={',
      '    "prompt": "A futuristic cityscape at sunset",',
      '    "model": "stabilityai/stable-diffusion-3"',
      '  }',
      ')',
      '',
      'result = response.json()',
      'print(result)'
    ],
    javascript: [
      'const response = await fetch(',
      '  "https://api.imagerouter.io/v1/images/generations",',
      '  {',
      '    method: "POST",',
      '    headers: {',
      '      "Authorization": `Bearer ${process.env.IMAGINE_API_KEY}`,',
      '      "Content-Type": "application/json"',
      '    },',
      '    body: JSON.stringify({',
      '      prompt: "A futuristic cityscape at sunset",',
      '      model: "stabilityai/stable-diffusion-3"',
      '    })',
      '  }',
      ');',
      '',
      'const result = await response.json();',
      'console.log(result);'
    ],
    java: [
      'HttpClient client = HttpClient.newHttpClient();',
      'HttpRequest request = HttpRequest.newBuilder()',
      '  .uri(URI.create("https://api.imagerouter.io/v1/images/generations"))',
      '  .header("Authorization", "Bearer " + System.getenv("IMAGINE_API_KEY"))',
      '  .header("Content-Type", "application/json")',
      '  .POST(HttpRequest.BodyPublishers.ofString(',
      '    "{\\"prompt\\": \\"A futuristic cityscape at sunset\\", ' + 
      '    \\"model\\": \\"stabilityai/stable-diffusion-3\\"}"',
      '  ))',
      '  .build();',
      '',
      'HttpResponse<String> response = client.send(request, ' + 
      '  HttpResponse.BodyHandlers.ofString());',
      'System.out.println(response.body());'
    ],
    cpp: [
      '#include <curl/curl.h>',
      '#include <iostream>',
      '',
      'int main() {',
      '  CURL *curl;',
      '  CURLcode res;',
      '  curl = curl_easy_init();',
      '  if(curl) {',
      '    curl_easy_setopt(curl, CURLOPT_URL, ',
      '      "https://api.imagerouter.io/v1/images/generations");',
      '    struct curl_slist *headers = NULL;',
      '    headers = curl_slist_append(headers, ',
      '      "Authorization: Bearer $IMAGINE_API_KEY");',
      '    headers = curl_slist_append(headers, ',
      '      "Content-Type: application/json");',
      '    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);',
      '    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, ',
      '      "{\\"prompt\\": \\"A futuristic cityscape at sunset\\", ' + 
      '      \\"model\\": \\"stabilityai/stable-diffusion-3\\"}");',
      '    res = curl_easy_perform(curl);',
      '    curl_easy_cleanup(curl);',
      '  }',
      '  return 0;',
      '}'
    ],
    rust: [
      'use reqwest;',
      'use std::env;',
      '',
      '#[tokio::main]',
      'async fn main() -> Result<(), Box<dyn std::error::Error>> {',
      '  let client = reqwest::Client::new();',
      '  let api_key = env::var("IMAGINE_API_KEY")?;',
      '  ',
      '  let res = client',
      '    .post("https://api.imagerouter.io/v1/images/generations")',
      '    .header("Authorization", format!("Bearer {}", api_key))',
      '    .header("Content-Type", "application/json")',
      '    .json(&serde_json::json!({',
      '      "prompt": "A futuristic cityscape at sunset",',
      '      "model": "stabilityai/stable-diffusion-3"',
      '    }))',
      '    .send()',
      '    .await?;',
      '    ',
      '  let response_text = res.text().await?;',
      '  println!("{}", response_text);',
      '  Ok(())',
      '}'
    ],
    go: [
      'package main',
      '',
      'import (',
      '  "bytes"',
      '  "fmt"',
      '  "net/http"',
      '  "os"',
      ')',
      '',
      'func main() {',
      '  url := "https://api.imagerouter.io/v1/images/generations"',
      '  payload := []byte(`{"prompt": "A futuristic cityscape at sunset", ' + 
      '"model": "stabilityai/stable-diffusion-3"}`)',
      '  ',
      '  req, _ := http.NewRequest("POST", url, bytes.NewBuffer(payload))',
      '  req.Header.Add("Authorization", "Bearer " + os.Getenv("IMAGINE_API_KEY"))',
      '  req.Header.Add("Content-Type", "application/json")',
      '  ',
      '  client := &http.Client{}',
      '  res, _ := client.Do(req)',
      '  defer res.Body.Close()',
      '  ',
      '  fmt.Println("Success")',
      '}'
    ]
  };

  return (
    <section className="w-full py-24">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-10 text-center">
          <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
            Developer Friendly
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Access 80+ models with just a few lines of code in your favorite language
          </p>
          
          <div className="w-full max-w-3xl">
            <Tabs defaultValue="curl" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-7">
                <TabsTrigger value="curl" className="flex items-center gap-2">
                  <TerminalIcon className="w-4 h-4" />
                  cURL
                </TabsTrigger>
                <TabsTrigger value="python" className="flex items-center gap-2">
                  <FileCodeIcon className="w-4 h-4" />
                  Python
                </TabsTrigger>
                <TabsTrigger value="javascript" className="flex items-center gap-2">
                  <FileJsonIcon className="w-4 h-4" />
                  JavaScript
                </TabsTrigger>
                <TabsTrigger value="java" className="flex items-center gap-2">
                  <FileTextIcon className="w-4 h-4" />
                  Java
                </TabsTrigger>
                <TabsTrigger value="cpp" className="flex items-center gap-2">
                  <FileTextIcon className="w-4 h-4" />
                  C++
                </TabsTrigger>
                <TabsTrigger value="rust" className="flex items-center gap-2">
                  <FileTextIcon className="w-4 h-4" />
                  Rust
                </TabsTrigger>
                <TabsTrigger value="go" className="flex items-center gap-2">
                  <FileCodeIcon className="w-4 h-4" />
                  Go
                </TabsTrigger>
              </TabsList>
              <TabsContent value="curl" className="mt-6">
                <Terminal sequence={false}>
                  {codeExamples.curl.map((line, index) => (
                    <div key={index} className="text-sm font-normal tracking-tight text-left">
                      {line}
                    </div>
                  ))}
                  <div className="text-sm font-normal tracking-tight text-left text-muted-foreground">
                    # Response: {"{"}"url": "https://cdn.imagerouter.io/image-123.png"{")"}
                  </div>
                </Terminal>
              </TabsContent>
              <TabsContent value="python" className="mt-6">
                <Terminal sequence={false}>
                  {codeExamples.python.map((line, index) => (
                    <div key={index} className="text-sm font-normal tracking-tight text-left">
                      {line}
                    </div>
                  ))}
                  <div className="text-sm font-normal tracking-tight text-left text-muted-foreground">
                    # Output: {"{"}'url': 'https://cdn.imagerouter.io/image-123.png'{"}"}
                  </div>
                </Terminal>
              </TabsContent>
              <TabsContent value="javascript" className="mt-6">
                <Terminal sequence={false}>
                  {codeExamples.javascript.map((line, index) => (
                    <div key={index} className="text-sm font-normal tracking-tight text-left">
                      {line}
                    </div>
                  ))}
                  <div className="text-sm font-normal tracking-tight text-left text-muted-foreground">
                    // Output: {"{"}url: "https://cdn.imagerouter.io/image-123.png"{")"}
                  </div>
                </Terminal>
              </TabsContent>
              <TabsContent value="java" className="mt-6">
                <Terminal sequence={false}>
                  {codeExamples.java.map((line, index) => (
                    <div key={index} className="text-sm font-normal tracking-tight text-left">
                      {line}
                    </div>
                  ))}
                  <div className="text-sm font-normal tracking-tight text-left text-muted-foreground">
                    // Output: {"{"}"url": "https://cdn.imagerouter.io/image-123.png"{")"}
                  </div>
                </Terminal>
              </TabsContent>
              <TabsContent value="cpp" className="mt-6">
                <Terminal sequence={false}>
                  {codeExamples.cpp.map((line, index) => (
                    <div key={index} className="text-sm font-normal tracking-tight text-left">
                      {line}
                    </div>
                  ))}
                  <div className="text-sm font-normal tracking-tight text-left text-muted-foreground">
                    // Output: {"{"}"url": "https://cdn.imagerouter.io/image-123.png"{")"}
                  </div>
                </Terminal>
              </TabsContent>
              <TabsContent value="rust" className="mt-6">
                <Terminal sequence={false}>
                  {codeExamples.rust.map((line, index) => (
                    <div key={index} className="text-sm font-normal tracking-tight text-left">
                      {line}
                    </div>
                  ))}
                  <div className="text-sm font-normal tracking-tight text-left text-muted-foreground">
                    // Output: {"{"}"url": "https://cdn.imagerouter.io/image-123.png"{")"}
                  </div>
                </Terminal>
              </TabsContent>
              <TabsContent value="go" className="mt-6">
                <Terminal sequence={false}>
                  {codeExamples.go.map((line, index) => (
                    <div key={index} className="text-sm font-normal tracking-tight text-left">
                      {line}
                    </div>
                  ))}
                  <div className="text-sm font-normal tracking-tight text-left text-muted-foreground">
                    // Output: Success
                  </div>
                </Terminal>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <a href="https://docs.imagerouter.io/" target="_blank" rel="noopener noreferrer">
                <BookOpenIcon className="w-4 h-4" />
                View Documentation
              </a>
            </Button>
            <Button variant="outline" className="flex items-center gap-2" disabled>
              <PackageIcon className="w-4 h-4" />
              SDKs & Libraries
              <span className="ml-2 text-xs bg-muted px-2 py-1 rounded">Coming Soon</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}