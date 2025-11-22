// Teacher Payment Service - Handles all teacher payout logic
export const processTeacherPayment = async (paymentData, lesson, student) => {
  try {
    // 1. Find the teacher who owns this lesson
    const teacher = await findLessonTeacher(lesson.id);
    
    if (!teacher) {
      console.error('No teacher found for lesson:', lesson.id);
      return false;
    }

    // 2. Check if teacher has bank account set up
    if (!teacher.bankAccount || !teacher.bankAccount.isVerified) {
      console.warn('Teacher has no verified bank account:', teacher.id);
      // You might want to hold funds until teacher adds bank account
    }

    // 3. Calculate platform fee (e.g., 20% platform, 80% teacher)
    const platformFeePercentage = 20;
    const platformFee = (paymentData.amount * platformFeePercentage) / 100;
    const teacherEarnings = paymentData.amount - platformFee;

    // 4. Create transaction record
    const transaction = {
      id: `tx_${Date.now()}`,
      amount: paymentData.amount,
      teacherEarnings: teacherEarnings,
      platformFee: platformFee,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      teacherId: teacher.id,
      teacherName: teacher.name,
      studentId: student.id,
      studentName: student.name,
      paymentGateway: paymentData.gateway,
      paymentId: paymentData.paymentId,
      date: new Date().toISOString(),
      status: 'completed',
      payoutStatus: teacher.bankAccount ? 'pending_payout' : 'held_no_bank'
    };

    // 5. Update teacher's earnings
    await updateTeacherEarnings(teacher.id, transaction);

    // 6. Initiate payout to teacher's bank account (if bank account exists)
    if (teacher.bankAccount && teacher.bankAccount.isVerified) {
      await initiateTeacherPayout(teacher.id, teacherEarnings, transaction.id);
    }

    // 7. Record platform earnings
    await recordPlatformEarnings(platformFee, transaction.id);

    console.log('Teacher payment processed successfully:', transaction);
    return true;

  } catch (error) {
    console.error('Error processing teacher payment:', error);
    return false;
  }
};

// Helper function to find lesson teacher
const findLessonTeacher = async (lessonId) => {
  // This should query your database/courses to find which teacher owns this lesson
  // For now, using localStorage/course structure
  const courses = JSON.parse(localStorage.getItem('courses') || '{}');
  
  for (const [courseKey, course] of Object.entries(courses)) {
    const lesson = course.lessons.find(l => l.id === lessonId);
    if (lesson) {
      return {
        id: course.teacherId || 'default_teacher',
        name: course.teacherName || 'Default Teacher',
        bankAccount: course.teacherBankAccount,
        earnings: course.teacherEarnings || { totalEarnings: 0, pendingPayout: 0, paidOut: 0, transactions: [] }
      };
    }
  }
  return null;
};

// Update teacher's earnings
const updateTeacherEarnings = async (teacherId, transaction) => {
  try {
    // Get current teacher data
    const teachers = JSON.parse(localStorage.getItem('teachers') || '{}');
    const teacher = teachers[teacherId] || {
      id: teacherId,
      earnings: {
        totalEarnings: 0,
        pendingPayout: 0,
        paidOut: 0,
        transactions: []
      }
    };

    // Update earnings
    teacher.earnings.totalEarnings += transaction.teacherEarnings;
    teacher.earnings.pendingPayout += transaction.teacherEarnings;
    teacher.earnings.transactions.unshift(transaction);

    // Save back to storage
    teachers[teacherId] = teacher;
    localStorage.setItem('teachers', JSON.stringify(teachers));

    // Also update in courses if needed
    updateCourseTeacherEarnings(teacherId, transaction);

    return true;
  } catch (error) {
    console.error('Error updating teacher earnings:', error);
    return false;
  }
};

// Initiate payout to teacher
const initiateTeacherPayout = async (teacherId, amount, transactionId) => {
  // In production, this would call your backend API which then calls:
  // - Paystack Transfer API
  // - Flutterwave Payout API  
  // - Monnify Disbursement API
  
  console.log(`Initiating payout of ₦${amount} to teacher ${teacherId}`);
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Payout completed for transaction: ${transactionId}`);
      resolve(true);
    }, 1000);
  });
};

// Record platform earnings
const recordPlatformEarnings = async (amount, transactionId) => {
  const platformEarnings = JSON.parse(localStorage.getItem('platformEarnings') || '{"total": 0, "transactions": []}');
  platformEarnings.total += amount;
  platformEarnings.transactions.push({
    amount: amount,
    transactionId: transactionId,
    date: new Date().toISOString()
  });
  localStorage.setItem('platformEarnings', JSON.stringify(platformEarnings));
};