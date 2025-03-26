import {add} from "@stellerui/sample-lib"

export default function Home() {
  const result = add(1, 2);
  return (
    <div>hello world by frontend {result}</div>
  );
}
