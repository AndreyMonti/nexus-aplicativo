import { User, Profile, SellerProfile } from '../constants/Types';


let _users: User[] = [
  {
    id: 'u1',
    email: 'user@example.com',
    name: 'Test User',
    avatar: undefined,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seller1',
    email: 'seller@example.com',
    name: 'Test Seller',
    avatar: undefined,
    createdAt: new Date().toISOString(),
  },
];

let _currentUser: User | null = null;

export const authService = {
  async login(email: string, password: string): Promise<User> {
    // In this static mode we ignore password; match by email.
    const user = _users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error('Invalid credentials (static)');
    }
    _currentUser = user;
    return Promise.resolve(user);
  },

  async register(email: string, password: string, name: string, type: 'buyer' | 'seller'): Promise<User> {
    // simple check for existing email
    if (_users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Email already registered (static)');
    }
    const id = `u${_users.length + 1}`;
    const newUser: User = {
      id,
      email,
      name,
      avatar: undefined,
      createdAt: new Date().toISOString(),
    };
    _users.push(newUser);
    _currentUser = newUser;
    return Promise.resolve(newUser);
  },

  async logout(): Promise<void> {
    _currentUser = null;
    return Promise.resolve();
  },

  async getCurrentUser(): Promise<User | null> {
    return Promise.resolve(_currentUser);
  },

  // helper used in some parts of the app expecting seller info
  async getSellerProfile(userId?: string) {
    if (!userId) return null;
    // simple static seller profile for seller1
    if (userId === 'seller1') {
      return {
        id: 'seller_profile_1',
        profile_id: 'seller1',
        shopName: 'Static Seller Shop',
      } as SellerProfile;
    }
    return null;
  },
};
