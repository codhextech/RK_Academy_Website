'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  Trash2,
  Check,
  X,
  Sliders,
  AlertCircle,
  Sparkles,
  Lock,
} from 'lucide-react';

interface AdminPermissions {
  enquiries: boolean;
  courses: boolean;
  trainers?: boolean;
  blog: boolean;
  settings: boolean;
  testimonials: boolean;
}

interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: 'superadmin' | 'staff';
  permissions: AdminPermissions;
  active: boolean;
  createdAt: string;
}

export default function AdminsManagementPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [maxAdminsLimit, setMaxAdminsLimit] = useState<number>(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditPermissionsModal, setShowEditPermissionsModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Add Form State
  const [newUsername, setNewUsername] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'staff' | 'superadmin'>('staff');
  const [newPermissions, setNewPermissions] = useState<AdminPermissions>({
    enquiries: true,
    courses: false,
    trainers: false,
    blog: false,
    settings: false,
    testimonials: false,
  });
  const [submittingAdd, setSubmittingAdd] = useState(false);

  // Edit Permissions Form State
  const [editPermissions, setEditPermissions] = useState<AdminPermissions>({
    enquiries: false,
    courses: false,
    trainers: false,
    blog: false,
    settings: false,
    testimonials: false,
  });
  const [submittingEdit, setSubmittingEdit] = useState(false);

  // Quantity Limit Form State
  const [newLimitInput, setNewLimitInput] = useState<number>(5);
  const [submittingLimit, setSubmittingLimit] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/admin/users');
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to load admin users.');
        return;
      }

      setUsers(data.users || []);
      setMaxAdminsLimit(data.maxAdminsLimit || 5);
      setNewLimitInput(data.maxAdminsLimit || 5);
    } catch (err) {
      console.error(err);
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Add New Admin
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingAdd(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: newUsername,
          name: newName,
          password: newPassword,
          role: newRole,
          permissions: newPermissions,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to create admin.');
        setSubmittingAdd(false);
        return;
      }

      setSuccessMsg(`Admin user @${newUsername} created successfully.`);
      setShowAddModal(false);
      setNewUsername('');
      setNewName('');
      setNewPassword('');
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError('Network error occurred.');
    } finally {
      setSubmittingAdd(false);
    }
  };

  // Open Edit Permissions Modal
  const openEditModal = (user: AdminUser) => {
    setSelectedUser(user);
    setEditPermissions({ ...user.permissions });
    setShowEditPermissionsModal(true);
  };

  // Save Edited Permissions
  const handleSavePermissions = async () => {
    if (!selectedUser) return;
    setSubmittingEdit(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedUser.id,
          permissions: editPermissions,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to update permissions.');
        setSubmittingEdit(false);
        return;
      }

      setSuccessMsg(`Updated edit access permissions for @${selectedUser.username}.`);
      setShowEditPermissionsModal(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError('Failed to update permissions.');
    } finally {
      setSubmittingEdit(false);
    }
  };

  // Toggle Active/Inactive Status
  const handleToggleActive = async (user: AdminUser) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          active: !user.active,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to update user status.');
        return;
      }

      setSuccessMsg(`Account status changed for @${user.username}.`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError('Error toggling status.');
    }
  };

  // Delete User
  const handleDeleteUser = async (user: AdminUser) => {
    if (!confirm(`Are you sure you want to permanently delete admin account @${user.username}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users?id=${user.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to delete user.');
        return;
      }

      setSuccessMsg(`Admin account @${user.username} deleted.`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError('Error deleting user.');
    }
  };

  // Update Max Admins Limit (Quantity Control)
  const handleSaveLimit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingLimit(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          maxAdminsLimit: Number(newLimitInput),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to update admin quantity limit.');
        setSubmittingLimit(false);
        return;
      }

      setSuccessMsg(`Admin quantity limit set to ${newLimitInput}.`);
      setShowLimitModal(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError('Error updating limit.');
    } finally {
      setSubmittingLimit(false);
    }
  };

  const isLimitReached = users.length >= maxAdminsLimit;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Super Admin Control Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#062343] tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7 text-[#0098DA]" />
            <span>Admin Quantity & Access Control</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Control the exact number of admin accounts and assign granular edit permissions for each staff member.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLimitModal(true)}
            className="px-3.5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <Sliders className="w-4 h-4 text-purple-600" />
            <span>Adjust Admin Limit ({maxAdminsLimit})</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            disabled={isLimitReached}
            className="px-4 py-2.5 bg-[#0098DA] hover:bg-[#0082ba] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Admin / Staff</span>
          </button>
        </div>
      </div>

      {/* FEEDBACK MESSAGES */}
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ADMIN QUANTITY CONTROL METRIC CARD - Crisp White */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Admin Quantity Meter</span>
              {isLimitReached && (
                <span className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-[10px] font-bold">
                  Limit Reached
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600">
              Currently using <strong className="text-[#062343] text-base">{users.length}</strong> of{' '}
              <strong className="text-purple-700 text-base">{maxAdminsLimit}</strong> authorized admin slots.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-80">
            <div className="flex-1 bg-slate-100 rounded-full h-3 p-0.5 border border-slate-200 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isLimitReached ? 'bg-rose-500' : 'bg-gradient-to-r from-[#0098DA] to-purple-600'
                }`}
                style={{ width: `${Math.min(100, (users.length / maxAdminsLimit) * 100)}%` }}
              ></div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700 whitespace-nowrap">
              {users.length} / {maxAdminsLimit} Slots
            </span>
          </div>
        </div>
      </div>

      {/* ADMINS LIST TABLE - Crisp White */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-[#062343]">Active Admin & Staff Accounts</h2>
          </div>
          <span className="text-xs font-medium text-slate-500">Total: {users.length} accounts</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="w-8 h-8 border-4 border-[#0098DA] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs">Loading admin accounts...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">User</th>
                  <th className="py-3 px-4 font-bold">Role</th>
                  <th className="py-3 px-4 font-bold">Edit Access Permissions</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {users.map((u) => {
                  const isSuper = u.role === 'superadmin';
                  return (
                    <tr key={u.id} className="hover:bg-sky-50/30 transition-colors">
                      {/* User Info */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#062343]">{u.name}</div>
                        <div className="text-xs text-[#0098DA] font-mono font-medium">@{u.username}</div>
                      </td>

                      {/* Role */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {isSuper ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            <Shield className="w-3.5 h-3.5 text-amber-600" />
                            Super Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-sky-100 text-[#0098DA] border border-sky-200">
                            <ShieldAlert className="w-3.5 h-3.5 text-[#0098DA]" />
                            Staff Admin
                          </span>
                        )}
                      </td>

                      {/* Edit Access Permissions */}
                      <td className="py-3.5 px-4">
                        {isSuper ? (
                          <span className="text-xs font-bold text-amber-700">
                            ★ Full Unrestricted Edit Privileges (All Modules)
                          </span>
                        ) : (
                          <div className="flex flex-wrap gap-1.5 max-w-md">
                            {u.permissions?.enquiries ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                ✓ Inquiries
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-400 text-[10px]">
                                ✗ Inquiries
                              </span>
                            )}

                            {u.permissions?.courses ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                ✓ Courses
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-400 text-[10px]">
                                ✗ Courses
                              </span>
                            )}

                            {u.permissions?.trainers ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                ✓ Trainers
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-400 text-[10px]">
                                ✗ Trainers
                              </span>
                            )}

                            {u.permissions?.blog ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                ✓ Blog
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-400 text-[10px]">
                                ✗ Blog
                              </span>
                            )}

                            {u.permissions?.settings ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                ✓ Settings
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-400 text-[10px]">
                                ✗ Settings
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {u.active ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-bold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-rose-700 text-xs font-bold">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            Disabled
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {!isSuper && (
                            <button
                              onClick={() => openEditModal(u)}
                              className="px-2.5 py-1 text-xs bg-sky-50 hover:bg-sky-100 text-[#0098DA] border border-sky-200 rounded-lg font-bold transition-colors cursor-pointer"
                              title="Edit Permissions"
                            >
                              Edit Access
                            </button>
                          )}

                          {u.username !== 'superadmin' && (
                            <button
                              onClick={() => handleToggleActive(u)}
                              className={`px-2.5 py-1 text-xs rounded-lg font-bold border transition-colors cursor-pointer ${
                                u.active
                                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                              }`}
                            >
                              {u.active ? 'Disable' : 'Enable'}
                            </button>
                          )}

                          {u.username !== 'superadmin' && (
                            <button
                              onClick={() => handleDeleteUser(u)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL 1: ADD NEW ADMIN / STAFF - Crisp White Theme */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#062343] flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#0098DA]" />
                <span>Create New Admin / Staff Account</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Username (For Login - No email needed!)
                </label>
                <input
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="e.g. counselor_sarah"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Display Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Sarah Perera (Counselor)"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Temporary Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Account Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as 'staff' | 'superadmin')}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                >
                  <option value="staff">Staff Admin (Restricted by permissions below)</option>
                  <option value="superadmin">Super Admin (Full access to everything)</option>
                </select>
              </div>

              {newRole === 'staff' && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="block text-xs font-bold text-[#062343] uppercase tracking-wider mb-2">
                    Select Edit Access Permissions:
                  </span>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newPermissions.enquiries}
                        onChange={(e) =>
                          setNewPermissions({ ...newPermissions, enquiries: e.target.checked })
                        }
                        className="rounded border-slate-300 text-[#0098DA] focus:ring-0"
                      />
                      <span>Manage Inquiries & Student Leads (View, status update, follow-up notes)</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newPermissions.courses}
                        onChange={(e) =>
                          setNewPermissions({ ...newPermissions, courses: e.target.checked })
                        }
                        className="rounded border-slate-300 text-[#0098DA] focus:ring-0"
                      />
                      <span>Manage Courses & IELTS Batches (Fees, schedules, details)</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(newPermissions.trainers)}
                        onChange={(e) =>
                          setNewPermissions({ ...newPermissions, trainers: e.target.checked })
                        }
                        className="rounded border-slate-300 text-[#0098DA] focus:ring-0"
                      />
                      <span>Manage Faculty & Trainers (Add, update bio, qualifications)</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newPermissions.blog}
                        onChange={(e) =>
                          setNewPermissions({ ...newPermissions, blog: e.target.checked })
                        }
                        className="rounded border-slate-300 text-[#0098DA] focus:ring-0"
                      />
                      <span>Manage Blog Posts & Preparation Articles</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newPermissions.settings}
                        onChange={(e) =>
                          setNewPermissions({ ...newPermissions, settings: e.target.checked })
                        }
                        className="rounded border-slate-300 text-[#0098DA] focus:ring-0"
                      />
                      <span>Manage Academy Site Settings (Phone, WhatsApp, address, office hours)</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingAdd}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0098DA] hover:bg-[#0082ba] rounded-xl shadow-xs disabled:opacity-50"
                >
                  {submittingAdd ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT PERMISSIONS (ACCESS CONTROL) */}
      {showEditPermissionsModal && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-[#062343]">Edit Access Permissions</h3>
                <p className="text-xs text-[#0098DA] font-mono font-bold">@{selectedUser.username} ({selectedUser.name})</p>
              </div>
              <button
                onClick={() => setShowEditPermissionsModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-xs text-slate-600 block font-medium">
                Toggle the modules this staff member is authorized to view and edit:
              </span>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <span className="text-xs font-bold text-slate-800">Inquiries & Leads Management</span>
                <input
                  type="checkbox"
                  checked={editPermissions.enquiries}
                  onChange={(e) =>
                    setEditPermissions({ ...editPermissions, enquiries: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#0098DA]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <span className="text-xs font-bold text-slate-800">Courses & IELTS Batches</span>
                <input
                  type="checkbox"
                  checked={editPermissions.courses}
                  onChange={(e) =>
                    setEditPermissions({ ...editPermissions, courses: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#0098DA]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <span className="text-xs font-bold text-slate-800">Faculty & Trainers</span>
                <input
                  type="checkbox"
                  checked={Boolean(editPermissions.trainers)}
                  onChange={(e) =>
                    setEditPermissions({ ...editPermissions, trainers: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#0098DA]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <span className="text-xs font-bold text-slate-800">Blog Articles & Tips</span>
                <input
                  type="checkbox"
                  checked={editPermissions.blog}
                  onChange={(e) =>
                    setEditPermissions({ ...editPermissions, blog: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#0098DA]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <span className="text-xs font-bold text-slate-800">Academy Site Settings</span>
                <input
                  type="checkbox"
                  checked={editPermissions.settings}
                  onChange={(e) =>
                    setEditPermissions({ ...editPermissions, settings: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#0098DA]"
                />
              </label>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowEditPermissionsModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePermissions}
                disabled={submittingEdit}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0098DA] hover:bg-[#0082ba] rounded-xl shadow-xs disabled:opacity-50"
              >
                {submittingEdit ? 'Saving...' : 'Save Permissions'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ADJUST ADMIN QUANTITY LIMIT */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#062343] flex items-center gap-2">
                <Sliders className="w-5 h-5 text-purple-600" />
                <span>Adjust Admin Quantity Limit</span>
              </h3>
              <button
                onClick={() => setShowLimitModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLimit} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                As Super Admin, you can set the maximum number of administrative accounts allowed to exist simultaneously on this platform.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Maximum Admin Accounts Allowed
                </label>
                <input
                  type="number"
                  min={users.length}
                  max={50}
                  required
                  value={newLimitInput}
                  onChange={(e) => setNewLimitInput(Number(e.target.value))}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Cannot be lower than current active user count ({users.length}).
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowLimitModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingLimit}
                  className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs disabled:opacity-50"
                >
                  {submittingLimit ? 'Updating...' : 'Save Limit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
