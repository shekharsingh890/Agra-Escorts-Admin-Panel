import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { db } from "../../firebase/Firebase";
import { useEffect } from "react";

interface ContactFormData {
  Phone1: string;
  Phone2: string;
  Whatsapp1: string;
  Whatsapp2: string;
}

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    defaultValues: {
      Phone1: "",
      Phone2: "",
      Whatsapp1: "",
      Whatsapp2: "",
    },
  });

  const uid = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchContactDetails = async () => {
      if (!uid) {
        toast.error("User ID not found. Please log in again.");
        return;
      }

      try {
        const contactRef = doc(db, "contact", uid);
        const contactSnap = await getDoc(contactRef);

        if (contactSnap.exists()) {
          const contactData = contactSnap.data();

          reset({
            Phone1: contactData.Phone1 || "",
            Phone2: contactData.Phone2 || "",
            Whatsapp1: contactData.Whatsapp1 || "",
            Whatsapp2: contactData.Whatsapp2 || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch contact details:", error);
        toast.error("Failed to load contact details!");
      }
    };

    fetchContactDetails();
  }, [uid, reset]);

  const onSubmit = async (data: ContactFormData) => {
    if (!uid) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    try {
      await updateDoc(doc(db, "contact", uid), {
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
      <div className="w-full flex flex-col items-center gap-8 max-w-md bg-white rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900">Contact Details</h1>
          <p className="text-sm text-gray-500">Update your phone and WhatsApp contact information.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          {/* Phone 1 */}
          <div className="flex flex-col gap-1">
            <label htmlFor="Phone1" className="text-sm font-medium text-gray-700">Phone 1</label>
            <input id="Phone1" type="tel" placeholder="9876543210" disabled={isSubmitting} maxLength={10} className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100 ${errors.Phone1 ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
              {...register("Phone1", {
                required: "Phone 1 is required.",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit Indian mobile number.",
                },
              })}
            />
            {errors.Phone1 && (
              <p className="text-sm text-red-500">{errors.Phone1.message}</p>
            )}
          </div>

          {/* Phone 2 */}
          <div className="flex flex-col gap-1">
            <label htmlFor="Phone2" className="text-sm font-medium text-gray-700">Phone 2</label>
            <input id="Phone2" type="tel" placeholder="9876543210" disabled={isSubmitting} maxLength={10} className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100 ${errors.Phone2 ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
              {...register("Phone2", {
                required: "Phone 2 is required.",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit Indian mobile number.",
                },
              })}
            />
            {errors.Phone2 && (
              <p className="text-sm text-red-500">{errors.Phone2.message}</p>
            )}
          </div>

          {/* Whatsapp 1 */}
          <div className="flex flex-col gap-1">
            <label htmlFor="Whatsapp1" className="text-sm font-medium text-gray-700">WhatsApp 1</label>
            <input id="Whatsapp1" type="tel" placeholder="9876543210" disabled={isSubmitting} maxLength={10} className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100 ${errors.Whatsapp1 ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
              {...register("Whatsapp1", {
                required: "WhatsApp 1 is required.",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit Indian mobile number.",
                },
              })}
            />
            {errors.Whatsapp1 && (
              <p className="text-sm text-red-500">{errors.Whatsapp1.message}</p>
            )}
          </div>

          {/* Whatsapp 2 */}
          <div className="flex flex-col gap-1">
            <label htmlFor="Whatsapp2" className="text-sm font-medium text-gray-700">WhatsApp 2</label>
            <input id="Whatsapp2" type="tel" placeholder="9876543210" disabled={isSubmitting} maxLength={10} className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100 ${errors.Whatsapp2 ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
              {...register("Whatsapp2", {
                required: "WhatsApp 2 is required.",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit Indian mobile number.",
                },
              })}
            />
            {errors.Whatsapp2 && (
              <p className="text-sm text-red-500">{errors.Whatsapp2.message}</p>
            )}
          </div>

          {/* Update button */}
          <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;