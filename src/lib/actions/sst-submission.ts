"use server";

import { sendMessage } from "../tele";
import prisma from "../prisma";
import { transformToTitleCase } from "../utils";

const approvingOfficerTelegrams = {
  test: "1610163233",
  // "cpt-priya": "+6592375445",
  "cpt-kumar": "1015935802",
  // "cpt-oh-en-quan": "+6588334034",
  // "cpt-sunny": "+6596785645",
  // "lta-rausyan": "+6593699497",
} as const;

type ApprovingOfficer = keyof typeof approvingOfficerTelegrams;

export default async function sstFormSubmission(
  data: FormData
): Promise<Option<"success">> {
  for (const [name, value] of data.entries()) {
    console.log(`Name: ${name}, Value: ${value}`);
  }
  const conductingOfficer = data.get("conducting-officer")?.toString() ?? "";
  const approvingOfficer = data.get("approving-officer")?.toString() ?? "";
  const activity = data.get("activity")?.toString() ?? "";
  const company = data.get("company")?.toString() ?? "";
  const date = data.get("date-of-conduct")?.toString() ?? "";
  const time = data.get("time-of-conduct")?.toString() ?? "";
  const location = data.get("location")?.toString() ?? "";
  const noOfParticipants =
    data.get("number-of-participants")?.toString() ?? "0";

  if (
    !conductingOfficer ||
    !activity ||
    !date ||
    !time ||
    !approvingOfficer ||
    !company ||
    !location ||
    !noOfParticipants
  ) {
    return null;
  }

  if (!(approvingOfficer in approvingOfficerTelegrams)) {
    console.log("Invalid approving officer.");
    return null;
  }

  const approvingOfficerTele: string =
    approvingOfficerTelegrams[approvingOfficer as ApprovingOfficer];

  const message = `
🚨 New Activity Conducted 🚨
  
Conducting Officer: ${conductingOfficer}
Company: ${company}
Activity Type: ${transformToTitleCase(activity)}
Date: ${date}
Time: ${time}
Location: ${location}
Pax: ${noOfParticipants}
  
Please approve this conduct by reacting with a 👍.
  `;

  const id = await sendMessage(approvingOfficerTele, message);

  const dbActivity = await prisma.sST.create({
    data: {
      id: id.toString(),
      conductingOfficer: conductingOfficer.toString(),
      approvingOfficer: approvingOfficer.toString(),
      company: company.toString(),
      date: date.toString(),
      location: location.toString(),
      noOfParticipants: parseInt(noOfParticipants.toString()),
      time: time.toString(),
      type: activity.toString(),
    },
  });

  if (id && dbActivity) {
    return "success";
  }
}
