import { ReactNode } from "react";
import TOC from "./TOC";

export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <div>
        <TOC />
      </div>
      <div>{children}</div>
    </div>
  );
}
