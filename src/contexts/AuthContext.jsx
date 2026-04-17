import React, { createContext, useState, useContext, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useToast } from './ToastContext'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    const storedUser = localStorage.getItem('ab_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, role')
      .eq('username', username)
      .eq('password', password)
      .single()

    if (error || !data) {
      showToast('Invalid username or password', 'error')
      return false
    }

    const userData = { id: data.id, username: data.username, role: data.role }
    localStorage.setItem('ab_user', JSON.stringify(userData))
    setUser(userData)
    showToast(`Welcome ${data.username}`, 'success')
    return true
  }

  const logout = () => {
    localStorage.removeItem('ab_user')
    setUser(null)
  }

  const changePassword = async (oldPassword, newPassword) => {
    if (!user) return false
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .eq('password', oldPassword)
      .single()
    if (error || !data) {
      showToast('Old password is incorrect', 'error')
      return false
    }
    const { error: updateError } = await supabase
      .from('users')
      .update({ password: newPassword })
      .eq('id', user.id)
    if (updateError) {
      showToast('Failed to update password', 'error')
      return false
    }
    showToast('Password changed successfully', 'success')
    return true
  }

  const changeUsername = async (newUsername, password) => {
    if (!user) return false
    // First verify password
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .eq('password', password)
      .single()
    if (error || !data) {
      showToast('Incorrect password', 'error')
      return false
    }
    // Check if new username already exists
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('username', newUsername)
      .single()
    if (existing) {
      showToast('Username already taken', 'error')
      return false
    }
    // Update username
    const { error: updateError } = await supabase
      .from('users')
      .update({ username: newUsername })
      .eq('id', user.id)
    if (updateError) {
      showToast('Failed to update username', 'error')
      return false
    }
    const updatedUser = { ...user, username: newUsername }
    localStorage.setItem('ab_user', JSON.stringify(updatedUser))
    setUser(updatedUser)
    showToast('Username changed successfully', 'success')
    return true
  }

  const addWorker = async (username, password) => {
    if (user.role !== 'admin') return false
    const { error } = await supabase
      .from('users')
      .insert([{ username, password, role: 'worker', created_by: user.id }])
    if (error) {
      showToast('Username already exists', 'error')
      return false
    }
    showToast(`Worker ${username} added`, 'success')
    return true
  }

  const deleteWorker = async (workerId) => {
    if (user.role !== 'admin') return false
    const { error } = await supabase.from('users').delete().eq('id', workerId)
    if (error) {
      showToast('Failed to delete worker', 'error')
      return false
    }
    showToast('Worker deleted', 'success')
    return true
  }

  const getWorkers = async () => {
    if (user.role !== 'admin') return []
    const { data } = await supabase.from('users').select('id, username').eq('role', 'worker')
    return data || []
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, changePassword, changeUsername, addWorker, deleteWorker, getWorkers, loading }}>
      {children}
    </AuthContext.Provider>
  )
}