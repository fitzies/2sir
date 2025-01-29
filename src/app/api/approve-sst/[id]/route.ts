import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const obj = await prisma.sST.update({
    where: { id },
    data: { approved: true },
  });

  return obj;
}
