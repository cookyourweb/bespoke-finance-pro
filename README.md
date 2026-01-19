# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## 🚀 Lead Capture & CRM Integration

This project includes an automated lead capture system with:

### Features
- ✅ **Lead Form**: Captures name, email, phone, professional profile, and preferences
- ✅ **Brevo CRM Integration**: Automatically syncs leads to Brevo (Sendinblue)
- ✅ **WhatsApp Integration**: Redirects leads to WhatsApp for appointment booking
- ✅ **Professional WhatsApp Agent**: Detailed prompt for AI-powered conversation setter
- ✅ **Local Backup**: Stores leads in localStorage as fallback
- ✅ **Lead Pipeline**: Tracks leads through 5 stages (nuevo_lead → contactado → interesado → reserva_pendiente → alumno_confirmado)

### Quick Setup

1. **Copy environment variables**:
```bash
cp .env.example .env
```

2. **Configure Brevo**:
   - Get your API Key from [Brevo](https://app.brevo.com/)
   - Create a contact list and get the List ID
   - Add to `.env`:
     ```
     VITE_BREVO_API_KEY=your_api_key_here
     VITE_BREVO_LIST_ID=your_list_id_here
     ```

3. **Configure WhatsApp**:
   - Add your WhatsApp number to `.env`:
     ```
     VITE_WHATSAPP_PHONE_NUMBER=34612345678
     ```

4. **Read full documentation**:
   - See [`LEAD_CAPTURE_SETUP.md`](./LEAD_CAPTURE_SETUP.md) for complete setup guide
   - See [`WHATSAPP_AGENT_PROMPT.md`](./WHATSAPP_AGENT_PROMPT.md) for WhatsApp agent configuration

### Files Added
- `src/services/brevo.service.ts` - Brevo API integration
- `src/services/whatsapp.service.ts` - WhatsApp integration
- `LEAD_CAPTURE_SETUP.md` - Complete setup guide
- `WHATSAPP_AGENT_PROMPT.md` - Professional WhatsApp agent prompt
- `.env.example` - Environment variables template

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
