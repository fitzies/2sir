import { Label } from "@/components/ui/label";

export default function FormElement({
  name,
  description,
  children,
}: {
  name: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>{name}</Label>
      <p className="text-sm text-zinc-400">{description}</p>
      {children}
    </div>
  );
}
