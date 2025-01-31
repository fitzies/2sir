"use client";

import FormElement from "@/components/form-element";
import PageWrapper from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import sstFormSubmission from "@/lib/actions/sst-submission";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  return (
    <PageWrapper className="flex flex-col items-center">
      <div className="mb-4 text-left lg:w-2/3 px-2 lg:px-4 flex flex-col gap-1">
        <h1 className=" font-semibold lg:text-4xl text-3xl ">
          2SIR SST Application
        </h1>
        <p className="text-zinc-400 text-left lg:text-md text-sm">
          Your approving officer will need to approve this conduct before it can
          be recorded.
        </p>
      </div>
      <form
        className="lg:w-2/3 w-full bg-zinc-900 rounded-lg flex flex-col px-8 py-12 gap-6"
        onSubmit={async (e) => {
          e.preventDefault(); // Prevent default form submission
          setLoading(true);
          try {
            const formData = new FormData(e.currentTarget);
            const res = await sstFormSubmission(formData);
            if (res) {
              router.push("/forms/sst/success");
            }
          } catch (error) {
            console.log(JSON.stringify(error));
            alert("Something went wrong. Please try again.");
          }
        }}
      >
        <FormElement name="Company">
          <Select name="company" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Alpha">Alpha</SelectItem>
              <SelectItem value="Bravo">Bravo</SelectItem>
              <SelectItem value="Charlie">Charlie</SelectItem>
              <SelectItem value="Support">Support</SelectItem>
              <SelectItem value="MSC">MSC</SelectItem>
            </SelectContent>
          </Select>
        </FormElement>
        <FormElement name="Date of Conduct" description="DDMMYY">
          <Input
            name="date-of-conduct"
            type="text"
            required
            pattern="\d{2}\d{2}\d{2}"
            title="Please enter the date in the format DDMMYY (e.g., 310123 for 31st January 2023)"
          />
        </FormElement>
        <FormElement name="Time of Conduct" description="HHMM-HHMM">
          <Input
            pattern="^([01]\d|2[0-3])[0-5]\d-([01]\d|2[0-3])[0-5]\d$"
            type="text"
            required
            name="time-of-conduct"
          />
        </FormElement>
        <FormElement name="Type of activity">
          <Select required name="activity">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="balance-flexibility-mobility">
                Balance, Flexibility, and Mobility
              </SelectItem>
              <SelectItem value="circuit-training">Circuit Training</SelectItem>
              <SelectItem value="interval-training">
                Interval Training
              </SelectItem>
              <SelectItem value="non-contact-sports">
                Non-contact Sports
              </SelectItem>
              <SelectItem value="recreational-activities">
                Recreational Activities
              </SelectItem>
            </SelectContent>
          </Select>
        </FormElement>
        <FormElement
          name="Location"
          description="Only in-camp locations are allowed."
        >
          <Input name="location" type="text" required />
        </FormElement>
        <FormElement
          name="Number of Participants"
          description="Must be less than or equal to 10"
        >
          <Input
            name="number-of-participants"
            type="number"
            max={10}
            min={2}
            required
          />
        </FormElement>
        <FormElement
          name="Rank & Name of Conducting Officer"
          description="Minimally 3SG / ME1 in rank"
        >
          <Input
            name="conducting-officer"
            type="text"
            pattern="^(?:[1-9][A-Z]{2}|[A-Z]{3})\s[A-Z]+(?:\s[A-Z]+)*$"
            required
          />
        </FormElement>
        <FormElement name="Approving Officer">
          <Select required name="approving-officer">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Approving Officer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cpt-sunny">CPT SUNNY</SelectItem>
              <SelectItem value="cpt-oh-en-quan">CPT OH EN QUAN</SelectItem>
              <SelectItem value="cpt-priya">CPT PRIYA</SelectItem>
              <SelectItem value="cpt-benjamn">CPT BENJAMN</SelectItem>
              <SelectItem value="cpt-kumar">CPT KUMAR</SelectItem>
              <SelectItem value="cpt-junkai">CPT JUNKAI</SelectItem>
            </SelectContent>
          </Select>
        </FormElement>
        {!loading ? (
          <Button className="!py-5 mt-4">Submit</Button>
        ) : (
          <Button className="!py-5 mt-4" disabled>
            ...
          </Button>
        )}
      </form>
    </PageWrapper>
  );
}
