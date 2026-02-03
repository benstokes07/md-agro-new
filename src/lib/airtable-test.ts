import Airtable from "airtable";

export async function testAirtable() {
  try {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN! }).base(
      process.env.AIRTABLE_BASE_ID!
    );
    
    const tableName = process.env.AIRTABLE_TABLE_NAME!;
    const records = await base(tableName).select({}).all();
    
    console.log("Total records:", records.length);
    
    if (records.length > 0) {
      const firstRecord = records[0];
      console.log("First record ID:", firstRecord.id);
      console.log("First record fields:", firstRecord.fields);
      console.log("First record _rawJson:", firstRecord._rawJson);
      
      // Try to get all field names
      const fieldNames = Object.keys(firstRecord.fields || {});
      console.log("Field names:", fieldNames);
      
      // Try different ways to access the Image field
      console.log("record.get('Image'):", firstRecord.get("Image"));
      console.log("fields['Image']:", firstRecord.fields["Image"]);
      console.log("_rawJson.fields['Image']:", firstRecord._rawJson.fields["Image"]);
    }
    
    return records;
  } catch (error) {
    console.error("Airtable test error:", error);
    return [];
  }
}