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

## 🚀 Lead Capture & Scalable B2C CRM System

This project includes a **complete B2C CRM system** built for scalability:

### 🎯 Architecture

```
Frontend (Landing) → Supabase (Primary DB) → Brevo (Email Marketing)
                          ↓
                   WhatsApp Agent (AI)
```

### ✨ Features

**📊 Complete CRM Database** (Supabase PostgreSQL):
- ✅ **Leads Management**: Full lead lifecycle tracking with scoring
- ✅ **Conversations**: Multi-channel (WhatsApp, email, phone, web chat)
- ✅ **Messages**: Complete message history with AI metadata
- ✅ **Appointments**: Calendar and meeting management
- ✅ **Students & Enrollments**: Student lifecycle management
- ✅ **Activities Timeline**: Complete interaction history
- ✅ **Analytics Events**: Event tracking and funnel analysis

**🤖 AI-Powered WhatsApp Agent**:
- ✅ **Automated Conversations**: Natural language processing
- ✅ **Appointment Booking**: Automatic meeting scheduling
- ✅ **Lead Qualification**: Intelligent lead scoring
- ✅ **Context Aware**: Maintains conversation history

**📧 Email Marketing Integration**:
- ✅ **Brevo CRM Sync**: Secondary sync for email campaigns
- ✅ **Automated Workflows**: Drip campaigns and follow-ups
- ✅ **Segmentation**: Target specific audiences

**📈 Analytics & Tracking**:
- ✅ **UTM Tracking**: Campaign attribution
- ✅ **Event Analytics**: User behavior tracking
- ✅ **Lead Scoring**: Automatic qualification
- ✅ **Conversion Funnels**: Pipeline analytics

**🛡️ Reliability**:
- ✅ **Triple Backup**: Supabase + Brevo + localStorage
- ✅ **Graceful Degradation**: Works even if services fail
- ✅ **Edge Functions**: Serverless backend infrastructure

### 🚀 Quick Setup

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Configure Supabase (Primary Database)
```bash
# Copy environment template
cp .env.example .env
```

Follow the complete guide: **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**

Quick steps:
- Create project at [supabase.com](https://supabase.com)
- Run migration script (creates all tables)
- Add credentials to `.env`:
  ```
  VITE_SUPABASE_URL=https://xxxxx.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJhbG...
  ```

#### 3. Configure Brevo (Email Marketing - Optional)
- Get API Key from [Brevo](https://app.brevo.com/)
- Add to `.env`:
  ```
  VITE_BREVO_API_KEY=xkeysib-...
  VITE_BREVO_LIST_ID=2
  ```

#### 4. Configure WhatsApp
- Add your number to `.env`:
  ```
  VITE_WHATSAPP_PHONE_NUMBER=34612345678
  ```

#### 5. Start Development Server
```bash
npm run dev
```

### 📚 Complete Documentation

- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Complete Supabase CRM setup (START HERE)
- **[LEAD_CAPTURE_SETUP.md](./LEAD_CAPTURE_SETUP.md)** - Lead capture & Brevo integration
- **[WHATSAPP_AGENT_PROMPT.md](./WHATSAPP_AGENT_PROMPT.md)** - AI WhatsApp agent configuration

### 📁 New Files & Structure

**Database Schema**:
- `supabase/migrations/001_initial_schema.sql` - Complete database schema (10 tables)

**Services**:
- `src/services/supabase.service.ts` - Supabase integration (primary DB)
- `src/services/brevo.service.ts` - Brevo API integration (email marketing)
- `src/services/whatsapp.service.ts` - WhatsApp integration

**Backend**:
- `supabase/functions/whatsapp-webhook/index.ts` - WhatsApp AI agent (Edge Function)

**Documentation**:
- `SUPABASE_SETUP.md` - Complete setup guide
- `LEAD_CAPTURE_SETUP.md` - Lead capture guide
- `WHATSAPP_AGENT_PROMPT.md` - AI agent prompt

**Configuration**:
- `.env.example` - Environment variables template

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
