/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { useServiceRequest } from "@/hooks/ApiClling"
import { useSession } from "next-auth/react"
import { toast } from "sonner"




const formSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    emailAddress: z.string().email("Invalid email"),
    propertyAddress: z.string().min(1, "Address required"),
    typeOfProperty: z.array(z.string()).min(1, "Select at least one type"),
    contactMethod: z.array(z.string()).min(1, "Select at least one method"),
    pestProblem: z.array(z.string()).min(1, "Select at least one problem"),
    locationOfProblem: z.array(z.string()).min(1, "Select at least one location"),
    durationOfIssue: z.string().min(1, "Enter duration"),
    exterminationService: z.string().min(1, "Select one"),
    preferredServiceDate: z.date().refine(date => date !== null, { message: "Pick a date" }),
    preferredTime: z.array(z.string()).min(1, "Select at least one time"),
    building: z.string().min(1, "Enter building info"),
    contactInfo: z.string().min(1, "Select contact info"),
    signature: z.string().min(1, "Signature required"),
    date: z.date().refine(date => date !== null, { message: "Pick a date" }),
    checkbox: z.boolean()
})

export default function ServiceForm() {
    const { data: session } = useSession();
    const token = session?.accessToken || "";
    const serviceMutation = useServiceRequest(token)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            preferredServiceDate: new Date(),
            date: new Date(),
            checkbox: false,
            typeOfProperty: [],
            contactMethod: [],
            pestProblem: [],
            locationOfProblem: [],
            preferredTime: []
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (values.checkbox) {
            console.log(values.checkbox)
            toast.error("Please agree to terms and conditions")
        } else {
            serviceMutation.mutate(values)
        }
    }

    const propertyOptions = ["Residential", "Commercial", "Multi-unit Building"]
    const contactOptions = ["Phone", "Email", "Text Message"]
    const pestOptions = ["Bedbugs", "Roaches", "Ants", "Termites", "Fleas", "Spiders", "Rodents"]

    const locationOptions = ["Whole property", "Specific rooms", "Basement", "Outside areas"]
    const timeOptions = ["Morning", "Afternoon", "Evening"]

    const MultiCheckboxGroup = ({ field, options }: { field: any; options: string[] }) => (
        <div className="flex flex-col space-y-2 border border-[#C0C3C1] p-3 rounded-[5px] bg-white">
            {options.map((opt) => (
                <label key={opt} className="flex items-center space-x-2">
                    <Checkbox
                        checked={field.value?.includes(opt)}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                field.onChange([...field.value, opt])
                            } else {
                                field.onChange(field.value.filter((v: string) => v !== opt))
                            }
                        }}
                    />
                    <span className="text-sm">{opt}</span>
                </label>
            ))}
        </div>
    )

    return (
        <div className="container mx-auto">
            <h1 className="text-[#0F3D61] font-bold text-[40px] mt-[120px]">
                Extermination Service Request Application
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-[16px] container mx-auto py-4 px-4"
                >
                    <h2 className="text-[#424242] font-semibold">Client Information</h2>

                    {/* Full Name & Phone */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[16px] font-semibold text-[#424242]">Full Name</FormLabel>
                                        <FormControl>
                                            <Input py-2 className="border py-[25px] placeholder:text-gray-400 border-[#C0C3C1] rounded-[5px]" placeholder="Full Name" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[16px] font-semibold text-[#424242]">Phone Number</FormLabel>
                                        <FormControl>
                                            <Input className="border  py-[25px] placeholder:text-gray-400 border-[#C0C3C1] rounded-[5px]" placeholder="Phone Number" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Email & Property Address */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                name="emailAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[16px] font-semibold text-[#424242]">Email Address</FormLabel>
                                        <FormControl>
                                            <Input className="border py-[25px] placeholder:text-gray-400 border-[#C0C3C1] rounded-[5px]" type="email" placeholder="Email Address" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                name="propertyAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[16px] font-semibold text-[#424242]">Property Address</FormLabel>
                                        <FormControl>
                                            <Input className="border py-[25px] placeholder:text-gray-400 border-[#C0C3C1] rounded-[5px]" placeholder="Property Address" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Multi-select groups */}
                    <div className="grid grid-cols-12 gap-4 ">
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                name="typeOfProperty"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[16px] font-semibold text-[#424242]">Type of Property</FormLabel>
                                        <FormControl>
                                            <MultiCheckboxGroup field={field} options={propertyOptions} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                name="contactMethod"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[16px] font-semibold text-[#424242]">Preferred Contact Method</FormLabel>
                                        <FormControl>
                                            <MultiCheckboxGroup field={field} options={contactOptions} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <h2 className="text-[#424242] font-semibold text-[20px] !mt-[60px] ">Infestation Details</h2>

                    {/* Pest Problem & Location */}
                    <div className="flex flex-col gap-4">
                        <div className="col-span-12 md:col-span-6  ">
                            <FormField
                                control={form.control}
                                name="pestProblem"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className="text-[16px]  font-semibold text-[#424242]">Type of Pest Problem</FormLabel>
                                        <FormControl>
                                            <MultiCheckboxGroup field={field} options={pestOptions} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                name="locationOfProblem"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[16px] font-semibold text-[#424242]">Location of Problem</FormLabel>
                                        <FormControl>
                                            <MultiCheckboxGroup field={field} options={locationOptions} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <h2 className="text-[#424242] font-semibold text-[20px] !mt-[60px] ">Scheduling & Access</h2>
                    {/* Duration & Previous Service */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                name="durationOfIssue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[16px] font-semibold text-[#424242]">Duration of Issue</FormLabel>
                                        <FormControl>
                                            <Input className="border py-[25px] placeholder:text-gray-400 border-[#C0C3C1] rounded-[5px]" placeholder="Duration of Issue" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                name="exterminationService"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[16px] font-semibold text-[#424242]">Previous Extermination Service</FormLabel>
                                        <FormControl>
                                            <select
                                                className="border border-[#C0C3C1] rounded-[5px] bg-white w-full h-[51px] px-2"
                                                onChange={field.onChange}
                                                value={field.value}
                                            >
                                                <option value="">Select Type</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Preferred Service Date & Time */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                name="preferredServiceDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[16px] font-semibold text-[#424242]">Preferred Service Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full justify-between border border-[#C0C3C1] h-[51px] rounded-[5px] bg-white",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 bg-white" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                name="preferredTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[16px] font-semibold text-[#424242]">Preferred Time</FormLabel>
                                        <FormControl>
                                            <MultiCheckboxGroup field={field} options={timeOptions} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Building & Contact Info */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                name="building"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[16px] font-semibold text-[#424242]">Building/Super Access Required</FormLabel>
                                        <FormControl>
                                            <select
                                                className="border border-[#C0C3C1]  rounded-[5px] bg-white w-full h-[51px] px-2"
                                                onChange={field.onChange}
                                                value={field.value}
                                            >
                                                <option value="">Select Type</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                name="contactInfo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[16px] font-semibold text-[#424242]">Contact Info</FormLabel>
                                        <FormControl>
                                            <Input className="border py-[25px] placeholder:text-gray-400 border-[#C0C3C1] rounded-[5px]" placeholder="Type your contact info" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <h2 className="text-[#424242] font-semibold text-[20px] !mt-[60px] ">Authorization</h2>
                    {/* Signature & Date */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                name="signature"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[16px] font-semibold text-[#424242]">Signature</FormLabel>
                                        <FormControl>
                                            <Input className="border py-[25px] placeholder:text-gray-400 border-[#C0C3C1] rounded-[5px]" placeholder="Type your signature" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[16px] font-semibold text-[#424242]">Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl >
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full justify-between border py-[25px]  placeholder:text-gray-400 border-[#C0C3C1] rounded-[5px] bg-white",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 bg-white" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Checkbox */}
                    <FormField
                        control={form.control}
                        name="checkbox"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 rounded-md  p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="mt-0" // remove top offset
                                    />
                                </FormControl>
                                <div className="flex-1">
                                    <FormLabel className="text-sm font-normal leading-snug text-[#616161]">
                                        By signing below, I authorize Bridge Point Solutions LLC to share my
                                        information with a licensed extermination company for service
                                        coordination. I understand Bridge Point Solutions is a referral
                                        intermediary and not the direct service provider.
                                    </FormLabel>
                                    <FormMessage className="text-red-500" />
                                </div>
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end w-full ">
                        <Button type="submit" className=" text-white px-11 rounded-[5px] hover:bg-[#0F3D61]/90  flex items-end  bg-[#0F3D61] justify-end">
                            Submit {serviceMutation.isPending ? "..." : ""}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
