"use client";

import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = Icons[name as keyof typeof Icons] as React.ComponentType<LucideProps>;

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...props} />;
}
