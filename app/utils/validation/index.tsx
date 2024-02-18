import { z } from "zod";

export const AssetSchema = z.object({
    assetName: z.string().min(0, "Name must be at least 3 characters"),
    location: z.string().min(3, "Location must be at least 3 characters"),
    contacts: z.string().min(3, "contacts must be at least 3 characters"),
    // attachments: z.string().min(3, "attachments must be at least 3 characters"),
    // image: z.string().min(3, "image must be at least 3 characters"),
    // assetId: z.string().min(3, "assetId must be at least 3 characters"),
  });