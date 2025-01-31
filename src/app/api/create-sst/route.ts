import prisma from "@/lib/prisma";
import { formatDateToDDMMYY, mapCompanyName } from "@/lib/utils";

type ConductForm = {
  question: string;
  answer: string;
}[];

type NewConduct = {
  // id: string;
  company: string;
  date: string;
  time: string;
  type: string;
  location: string;
  noOfParticipants: number;
  conductingOfficer: string;
  approvingOfficer: string;
  approved: boolean;
};

const parseConductForm = (data: ConductForm): NewConduct => {
  const findAnswer = (question: string) =>
    data.find((q) => q.question === question)?.answer || "";

  return {
    company: mapCompanyName(findAnswer("Coy")),
    date: formatDateToDDMMYY(new Date(findAnswer("Date of Conduct"))),
    time: findAnswer("Time of Conduct (Start - End Time)"),
    type: findAnswer("Type of Activity"),
    location: findAnswer("Location"),
    noOfParticipants: parseInt(findAnswer("Number of Participants"), 10) || 0,
    conductingOfficer: findAnswer(
      "Rank & Name of Conducting Officer"
    ).toUpperCase(),
    approvingOfficer: findAnswer(
      "Rank & Name of Approving Officer"
    ).toUpperCase(),
    approved: !!findAnswer("Email of Approving Officer"),
  };
};

export async function POST(req: Request) {
  const res = await req.json();

  const data = await prisma.sST.create({ data: parseConductForm(res) });

  return Response.json({
    success: !!data,
    data,
  });
}
