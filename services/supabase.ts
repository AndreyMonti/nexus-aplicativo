/**
 * Supabase stub removed.
 * The project has been converted to static/in-memory services for UI testing.
 * If some leftover modules still import this file, this stub will provide
 * a harmless placeholder.
 */

export const supabase = {
  auth: {
    // no-op implementations to avoid runtime errors if called
    async signInWithPassword() { throw new Error('supabase auth disabled in static mode'); },
    async signOut() { return; },
    async getSession() { return { data: { session: null } }; },
  },
  from() {
    throw new Error('supabase client disabled in static mode');
  },
};
