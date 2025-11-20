import React, { useState, useEffect } from 'react';
import { 
  getPendingTeachers, 
  approveTeacher, 
  rejectTeacher, 
  getAllTeachers,
  getPlatformStats,
  getUsers,
  getCourses,
  deleteUser,
  getAllCoursesForAdmin,
  getCourseAnalyticsForAdmin
} from '../utils/storage';
import './AdminDashboard.css';

const AdminDashboard = ({ currentUser, setCurrentView }) => {
  const [pendingTeachers, setPendingTeachers] = useState([]);
  const [approvedTeachers, setApprovedTeachers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const pending = getPendingTeachers();
      const allTeachers = getAllTeachers();
      const approved = allTeachers.filter(teacher => teacher.isApproved);
      const platformStats = getPlatformStats();
      const users = Object.values(getUsers());
      const courses = Object.values(getAllCoursesForAdmin());
      
      setPendingTeachers(pending);
      setApprovedTeachers(approved);
      setAllUsers(users);
      setAllCourses(courses);
      setStats(platformStats);
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  const handleApproveTeacher = (teacherId) => {
    setLoading(true);
    try {
      approveTeacher(teacherId);
      loadData();
      alert('Teacher approved successfully!');
    } catch (error) {
      alert('Error approving teacher: ' + error.message);
    }
    setLoading(false);
  };

  const handleRejectTeacher = (teacherId) => {
    if (window.confirm('Are you sure you want to reject this teacher application?')) {
      setLoading(true);
      try {
        rejectTeacher(teacherId);
        loadData();
        alert('Teacher application rejected.');
      } catch (error) {
        alert('Error rejecting teacher: ' + error.message);
      }
      setLoading(false);
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setLoading(true);
      try {
        deleteUser(userId);
        loadData();
        alert('User deleted successfully.');
      } catch (error) {
        alert('Error deleting user: ' + error.message);
      }
      setLoading(false);
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseUserDetails = () => {
    setSelectedUser(null);
  };

  const handleManageCourses = () => {
    setCurrentView('admin-courses');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getUserRoleBadge = (user) => {
    if (user.role === 'admin') {
      return <span className="role-badge admin">Admin</span>;
    } else if (user.role === 'teacher') {
      return user.isApproved ? 
        <span className="role-badge teacher">Teacher</span> :
        <span className="role-badge pending">Pending Teacher</span>;
    } else {
      return <span className="role-badge student">Student</span>;
    }
  };

  // Get top courses by enrollment
  const getTopCourses = () => {
    try {
      const coursesWithAnalytics = allCourses.map(course => {
        const analytics = getCourseAnalyticsForAdmin(course.key);
        return { ...course, analytics };
      });
      
      return coursesWithAnalytics
        .sort((a, b) => (b.analytics?.totalEnrolled || 0) - (a.analytics?.totalEnrolled || 0))
        .slice(0, 5);
    } catch (error) {
      console.error('Error getting top courses:', error);
      return [];
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {currentUser?.name}</p>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button 
          className="action-btn primary"
          onClick={handleManageCourses}
        >
          📚 Manage Courses
        </button>
        <button 
          className="action-btn secondary"
          onClick={() => setActiveTab('pending')}
        >
          👨‍🏫 Teacher Requests ({pendingTeachers.length})
        </button>
        <button 
          className="action-btn secondary"
          onClick={() => setActiveTab('users')}
        >
          👥 All Users ({allUsers.length})
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalStudents || 0}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-info">
            <h3>{approvedTeachers.length}</h3>
            <p>Approved Teachers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{allCourses.length}</h3>
            <p>Total Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{pendingTeachers.length}</h3>
            <p>Pending Requests</p>
          </div>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="overview-tab">
          <div className="overview-grid">
            {/* Top Courses Section */}
            <div className="overview-card">
              <h3>📊 Top Courses</h3>
              <div className="courses-list">
                {getTopCourses().map((course, index) => (
                  <div key={course.key} className="course-item">
                    <div className="course-rank">#{index + 1}</div>
                    <div className="course-info">
                      <div className="course-title">{course.title}</div>
                      <div className="course-meta">
                        <span>By: {course.teacherName}</span>
                        <span>•</span>
                        <span>{course.analytics?.totalEnrolled || 0} students</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="overview-card">
              <h3>🔄 Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">👨‍🏫</div>
                  <div className="activity-info">
                    <div className="activity-title">Teacher Applications</div>
                    <div className="activity-desc">
                      {pendingTeachers.length} pending review
                    </div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📚</div>
                  <div className="activity-info">
                    <div className="activity-title">Course Management</div>
                    <div className="activity-desc">
                      {allCourses.length} total courses
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Management Section */}
      <div className="management-section">
        <div className="section-header">
          <h2>User Management</h2>
          <div className="tab-buttons">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Teachers ({pendingTeachers.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'teachers' ? 'active' : ''}`}
              onClick={() => setActiveTab('teachers')}
            >
              Approved Teachers ({approvedTeachers.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              All Users ({allUsers.length})
            </button>
          </div>
        </div>

        {/* Pending Teachers Tab */}
        {activeTab === 'pending' && (
          <div className="tab-content">
            {pendingTeachers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">✅</div>
                <h3>No Pending Requests</h3>
                <p>All teacher applications have been reviewed.</p>
              </div>
            ) : (
              <div className="users-grid">
                {pendingTeachers.map(teacher => (
                  <div key={teacher.id} className="user-card pending">
                    <div className="user-header">
                      <div className="user-avatar">
                        {teacher.name?.charAt(0)?.toUpperCase() || 'T'}
                      </div>
                      <div className="user-info">
                        <h4>{teacher.name}</h4>
                        <p className="user-email">{teacher.email}</p>
                        <p className="user-specialization">{teacher.specialization}</p>
                      </div>
                      {getUserRoleBadge(teacher)}
                    </div>
                    
                    <div className="user-bio">
                      <p>{teacher.bio || 'No bio provided.'}</p>
                    </div>

                    <div className="user-meta">
                      <div className="meta-item">
                        <span className="meta-label">Applied:</span>
                        <span className="meta-value">{formatDate(teacher.joinedDate)}</span>
                      </div>
                    </div>

                    <div className="action-buttons">
                      <button 
                        className="btn-approve"
                        onClick={() => handleApproveTeacher(teacher.id)}
                        disabled={loading}
                      >
                        ✅ Approve
                      </button>
                      <button 
                        className="btn-reject"
                        onClick={() => handleRejectTeacher(teacher.id)}
                        disabled={loading}
                      >
                        ❌ Reject
                      </button>
                      <button 
                        className="btn-view"
                        onClick={() => handleViewUser(teacher)}
                      >
                        👁 View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Approved Teachers Tab */}
        {activeTab === 'teachers' && (
          <div className="tab-content">
            {approvedTeachers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👨‍🏫</div>
                <h3>No Approved Teachers</h3>
                <p>Approved teachers will appear here.</p>
              </div>
            ) : (
              <div className="users-grid">
                {approvedTeachers.map(teacher => (
                  <div key={teacher.id} className="user-card approved">
                    <div className="user-header">
                      <div className="user-avatar approved">
                        {teacher.name?.charAt(0)?.toUpperCase() || 'T'}
                      </div>
                      <div className="user-info">
                        <h4>{teacher.name}</h4>
                        <p className="user-email">{teacher.email}</p>
                        <p className="user-specialization">{teacher.specialization}</p>
                      </div>
                      {getUserRoleBadge(teacher)}
                    </div>
                    
                    <div className="user-bio">
                      <p>{teacher.bio || 'No bio provided.'}</p>
                    </div>

                    <div className="user-meta">
                      <div className="meta-item">
                        <span className="meta-label">Approved:</span>
                        <span className="meta-value">
                          {teacher.approvedDate ? formatDate(teacher.approvedDate) : 'N/A'}
                        </span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Courses:</span>
                        <span className="meta-value">{teacher.courses?.length || 0}</span>
                      </div>
                    </div>

                    <div className="action-buttons">
                      <button 
                        className="btn-view"
                        onClick={() => handleViewUser(teacher)}
                      >
                        👁 View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* All Users Tab */}
        {activeTab === 'users' && (
          <div className="tab-content">
            {allUsers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <h3>No Users</h3>
                <p>No users found in the system.</p>
              </div>
            ) : (
              <div className="users-table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Joined Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map(user => (
                      <tr key={user.id} className="user-row">
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar small">
                              {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div className="user-details">
                              <div className="user-name">{user.name}</div>
                              <div className="user-email">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {getUserRoleBadge(user)}
                        </td>
                        <td>
                          {user.role === 'teacher' ? (
                            user.isApproved ? 'Approved' : 'Pending'
                          ) : (
                            'Active'
                          )}
                        </td>
                        <td>
                          {formatDate(user.joinedDate)}
                        </td>
                        <td>
                          <div className="table-actions">
                            <button 
                              className="btn-view"
                              onClick={() => handleViewUser(user)}
                            >
                              View
                            </button>
                            {user.id !== currentUser?.id && user.role !== 'admin' && (
                              <button 
                                className="btn-delete"
                                onClick={() => handleDeleteUser(user.id)}
                                disabled={loading}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>User Details</h3>
              <button className="close-btn" onClick={handleCloseUserDetails}>×</button>
            </div>
            <div className="modal-body">
              <div className="user-detail-section">
                <div className="detail-row">
                  <label>Name:</label>
                  <span>{selectedUser.name}</span>
                </div>
                <div className="detail-row">
                  <label>Email:</label>
                  <span>{selectedUser.email}</span>
                </div>
                <div className="detail-row">
                  <label>Role:</label>
                  <span>{getUserRoleBadge(selectedUser)}</span>
                </div>
                <div className="detail-row">
                  <label>Joined Date:</label>
                  <span>{formatDate(selectedUser.joinedDate)}</span>
                </div>
                {selectedUser.role === 'teacher' && (
                  <>
                    <div className="detail-row">
                      <label>Specialization:</label>
                      <span>{selectedUser.specialization || 'N/A'}</span>
                    </div>
                    <div className="detail-row">
                      <label>Status:</label>
                      <span>{selectedUser.isApproved ? 'Approved' : 'Pending Approval'}</span>
                    </div>
                    {selectedUser.approvedDate && (
                      <div className="detail-row">
                        <label>Approved Date:</label>
                        <span>{formatDate(selectedUser.approvedDate)}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-close" onClick={handleCloseUserDetails}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
