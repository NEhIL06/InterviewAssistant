
import { app } from "./app";
import { connectDB } from "./config/db";
import { PORT } from "./config/env";

async function main() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
