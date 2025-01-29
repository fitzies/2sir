import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const res = await prisma.sST.update({
    where: { id },
    data: { approved: true },
  });

  return Response.json({ res });
}
