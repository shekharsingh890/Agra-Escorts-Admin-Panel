import { doc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { db } from "../../firebase/Firebase";

interface ContactFormData {
  Phone1: string;
  Phone2: string;
  Whatsapp1: string;
  Whatsapp2: string;
}

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    defaultValues: {
      Phone1: "",
      Phone2: "",
      Whatsapp1: "",
      Whatsapp2: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await updateDoc(doc(db, "contact", "FlW4qtxUplCkDqSr9SBz"), {
        Phone1: data.Phone1,
        Phone2: data.Phone2,
        Whatsapp1: data.Whatsapp1,
        Whatsapp2: data.Whatsapp2,
      });

      toast.success("Contact details updated successfully!");
    } catch (error) {
      console.error("Failed to update contact details:", error);
      toast.error("Failed to update contact details!");
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Contact Details
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Update your phone and WhatsApp contact information.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Phone 1 */}
            <div>
              <label
                htmlFor="Phone1"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Phone 1
              </label>

              <input
                id="Phone1"
                type="tel"
                placeholder="+91 98765 43210"
                disabled={isSubmitting}
                {...register("Phone1", {
                  required: "Phone 1 is required.",
                })}
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition
                  focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100
                  ${
                    errors.Phone1
                      ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
              />

              {errors.Phone1 && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.Phone1.message}
                </p>
              )}
            </div>

            {/* Phone 2 */}
            <div>
              <label
                htmlFor="Phone2"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Phone 2
              </label>

              <input
                id="Phone2"
                type="tel"
                placeholder="+91 98765 43210"
                disabled={isSubmitting}
                {...register("Phone2")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            {/* WhatsApp 1 */}
            <div>
              <label
                htmlFor="Whatsapp1"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                WhatsApp 1
              </label>

              <input
                id="Whatsapp1"
                type="tel"
                placeholder="+91 98765 43210"
                disabled={isSubmitting}
                {...register("Whatsapp1", {
                  required: "WhatsApp 1 is required.",
                })}
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition
                  focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100
                  ${
                    errors.Whatsapp1
                      ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
              />

              {errors.Whatsapp1 && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.Whatsapp1.message}
                </p>
              )}
            </div>

            {/* WhatsApp 2 */}
            <div>
              <label
                htmlFor="Whatsapp2"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                WhatsApp 2
              </label>

              <input
                id="Whatsapp2"
                type="tel"
                placeholder="+91 98765 43210"
                disabled={isSubmitting}
                {...register("Whatsapp2")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            {/* Update button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition
                  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;