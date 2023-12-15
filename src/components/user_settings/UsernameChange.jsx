import React, { useState } from 'react';
import supabase from '../../lib/supabase';

const UsernameChange = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleUsernameChange = async () => {
    try {
      setLoading(true);
      setMessage(null);
      const user = supabase.auth.user();

      if (!user) {
        throw new Error('No user is signed in.');
      }

      const { data, error } = await supabase
        .from('users')
        .update({ username })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      // Set a success message
      setMessage({ type: 'success', text: 'Username updated successfully!' });
      console.log('Username updated!', data);
    } catch (error) {
      console.error('Error updating username:', error);
      // Set an error message
      setMessage({ type: 'error', text: 'Error updating username. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {message && (
        <div className={`alert ${message.type === 'error' ? 'alert-error' : 'alert-success'}`}>
          {message.text}
        </div>
      )}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter new username"
        disabled={loading}
      />
      <button onClick={handleUsernameChange} disabled={loading || !username}>
        {loading ? 'Updating...' : 'Change Username'}
      </button>
    </div>
  );
};

export default UsernameChange;
