import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import DailyRecordForm from './components/DailyRecordForm';
import DailyRecordView from './components/DailyRecordView';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// 班级数据
const classData = [
  { id: 1, name: '小小一班', count: 23 },
  { id: 2, name: '双语小小一班', count: 23 },
  { id: 3, name: '双语小小二班', count: 23 },
  { id: 4, name: '双语小小三班', count: 24 },
  { id: 5, name: '双语小小四班', count: 23 },
  { id: 6, name: '小一班', count: 27 },
  { id: 7, name: '双语小一班', count: 26 },
  { id: 8, name: '双语小二班', count: 27 },
  { id: 9, name: '双语小三班', count: 24 },
  { id: 10, name: '双语小四班', count: 26 },
  { id: 11, name: '双语小五班', count: 26 },
  { id: 12, name: '双语小六班', count: 26 },
  { id: 13, name: '双语小七班', count: 26 },
  { id: 14, name: '中一班', count: 31 },
  { id: 15, name: '中二班', count: 30 },
  { id: 16, name: '双语中一班', count: 34 },
  { id: 17, name: '双语中二班', count: 35 },
  { id: 18, name: '双语中三班', count: 35 },
  { id: 19, name: '双语中四班', count: 34 },
  { id: 20, name: '双语中五班', count: 35 },
  { id: 21, name: '双语中六班', count: 35 },
  { id: 22, name: '大一班', count: 34 },
  { id: 23, name: '大二班', count: 30 },
  { id: 24, name: '大三班', count: 32 },
  { id: 25, name: '双语大一班', count: 36 },
  { id: 26, name: '双语大二班', count: 36 },
  { id: 27, name: '双语大三班', count: 36 },
  { id: 28, name: '双语大四班', count: 36 },
  { id: 29, name: '双语大五班', count: 36 },
  { id: 30, name: '双语大六班', count: 36 },
];

// 班级选择页面组件
const ClassList: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // 按类型分组班级
  const smallClasses = classData.filter(c => c.name.includes('小') && !c.name.includes('小小'));
  const tinyClasses = classData.filter(c => c.name.includes('小小'));
  const mediumClasses = classData.filter(c => c.name.includes('中'));
  const largeClasses = classData.filter(c => c.name.includes('大'));

  // 模拟已完成填写的学生数量
  const getCompletedCount = (classId: number) => {
    // 随机生成已完成的学生数量，实际应从API获取
    return Math.floor(Math.random() * classData.find(c => c.id === classId)!.count);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          my: 3,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
        }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          sx={{ 
            mb: 3, 
            color: '#1d1d1f', 
            fontWeight: 600,
            fontSize: '24px',
            letterSpacing: '-0.5px'
          }}
        >
          班级列表
        </Typography>
        
        {/* 日期选择器 */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <TextField
            label="选择日期"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        
        {/* 班级分组列表 */}
        <Box sx={{ mb: 4 }}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 500 }}>小小班 ({tinyClasses.length}个班)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {tinyClasses.map((classItem) => {
                  const completedCount = getCompletedCount(classItem.id);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={classItem.id}>
                      <Button
                        component={Link}
                        to={`/class-students/${classItem.id}`}
                        variant="outlined"
                        fullWidth
                        sx={{
                          p: 2,
                          borderRadius: '12px',
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          color: '#1d1d1f',
                          justifyContent: 'flex-start',
                          textAlign: 'left',
                          '&:hover': {
                            borderColor: '#06c',
                            bgcolor: 'rgba(0, 122, 255, 0.05)',
                          },
                        }}
                      >
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 500 }}>
                              {classItem.name}
                            </Typography>
                            <Chip 
                              label={`${completedCount}/${classItem.count}`} 
                              size="small" 
                              color={completedCount === classItem.count ? "success" : "default"}
                            />
                          </Box>
                          <Box sx={{ height: 4, bgcolor: '#f0f0f0', borderRadius: 2, overflow: 'hidden' }}>
                            <Box 
                              sx={{ 
                                height: '100%', 
                                width: `${(completedCount / classItem.count) * 100}%`,
                                bgcolor: completedCount === classItem.count ? '#4caf50' : '#06c',
                                borderRadius: 2
                              }} 
                            />
                          </Box>
                        </Box>
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 500 }}>小班 ({smallClasses.length}个班)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {smallClasses.map((classItem) => {
                  const completedCount = getCompletedCount(classItem.id);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={classItem.id}>
                      <Button
                        component={Link}
                        to={`/class-students/${classItem.id}`}
                        variant="outlined"
                        fullWidth
                        sx={{
                          p: 2,
                          borderRadius: '12px',
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          color: '#1d1d1f',
                          justifyContent: 'flex-start',
                          textAlign: 'left',
                          '&:hover': {
                            borderColor: '#06c',
                            bgcolor: 'rgba(0, 122, 255, 0.05)',
                          },
                        }}
                      >
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 500 }}>
                              {classItem.name}
                            </Typography>
                            <Chip 
                              label={`${completedCount}/${classItem.count}`} 
                              size="small" 
                              color={completedCount === classItem.count ? "success" : "default"}
                            />
                          </Box>
                          <Box sx={{ height: 4, bgcolor: '#f0f0f0', borderRadius: 2, overflow: 'hidden' }}>
                            <Box 
                              sx={{ 
                                height: '100%', 
                                width: `${(completedCount / classItem.count) * 100}%`,
                                bgcolor: completedCount === classItem.count ? '#4caf50' : '#06c',
                                borderRadius: 2
                              }} 
                            />
                          </Box>
                        </Box>
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 500 }}>中班 ({mediumClasses.length}个班)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {mediumClasses.map((classItem) => {
                  const completedCount = getCompletedCount(classItem.id);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={classItem.id}>
                      <Button
                        component={Link}
                        to={`/class-students/${classItem.id}`}
                        variant="outlined"
                        fullWidth
                        sx={{
                          p: 2,
                          borderRadius: '12px',
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          color: '#1d1d1f',
                          justifyContent: 'flex-start',
                          textAlign: 'left',
                          '&:hover': {
                            borderColor: '#06c',
                            bgcolor: 'rgba(0, 122, 255, 0.05)',
                          },
                        }}
                      >
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 500 }}>
                              {classItem.name}
                            </Typography>
                            <Chip 
                              label={`${completedCount}/${classItem.count}`} 
                              size="small" 
                              color={completedCount === classItem.count ? "success" : "default"}
                            />
                          </Box>
                          <Box sx={{ height: 4, bgcolor: '#f0f0f0', borderRadius: 2, overflow: 'hidden' }}>
                            <Box 
                              sx={{ 
                                height: '100%', 
                                width: `${(completedCount / classItem.count) * 100}%`,
                                bgcolor: completedCount === classItem.count ? '#4caf50' : '#06c',
                                borderRadius: 2
                              }} 
                            />
                          </Box>
                        </Box>
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 500 }}>大班 ({largeClasses.length}个班)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {largeClasses.map((classItem) => {
                  const completedCount = getCompletedCount(classItem.id);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={classItem.id}>
                      <Button
                        component={Link}
                        to={`/class-students/${classItem.id}`}
                        variant="outlined"
                        fullWidth
                        sx={{
                          p: 2,
                          borderRadius: '12px',
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          color: '#1d1d1f',
                          justifyContent: 'flex-start',
                          textAlign: 'left',
                          '&:hover': {
                            borderColor: '#06c',
                            bgcolor: 'rgba(0, 122, 255, 0.05)',
                          },
                        }}
                      >
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 500 }}>
                              {classItem.name}
                            </Typography>
                            <Chip 
                              label={`${completedCount}/${classItem.count}`} 
                              size="small" 
                              color={completedCount === classItem.count ? "success" : "default"}
                            />
                          </Box>
                          <Box sx={{ height: 4, bgcolor: '#f0f0f0', borderRadius: 2, overflow: 'hidden' }}>
                            <Box 
                              sx={{ 
                                height: '100%', 
                                width: `${(completedCount / classItem.count) * 100}%`,
                                bgcolor: completedCount === classItem.count ? '#4caf50' : '#06c',
                                borderRadius: 2
                              }} 
                            />
                          </Box>
                        </Box>
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Box>
        
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            component={Link}
            to="/"
            sx={{
              color: '#06c',
              '&:hover': {
                bgcolor: 'rgba(0, 122, 255, 0.05)',
              },
            }}
          >
            返回首页
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

// 学生列表页面组件
const StudentList: React.FC<{ classId?: string }> = ({ classId = "6" }) => {
  // 模拟学生数据，实际应从API获取
  const generateStudents = (count: number, classId: string) => {
    const students = [];
    const classInfo = classData.find(c => c.id === parseInt(classId));
    const className = classInfo ? classInfo.name : '未知班级';
    
    for (let i = 1; i <= count; i++) {
      const completed = Math.random() > 0.3; // 70%的学生已完成
      students.push({
        id: i,
        name: `学生${i}`,
        className: className,
        completed: completed
      });
    }
    return students;
  };

  const classInfo = classData.find(c => c.id === parseInt(classId));
  const students = generateStudents(classInfo ? classInfo.count : 20, classId);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          my: 3,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
        }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          sx={{ 
            mb: 2, 
            color: '#1d1d1f', 
            fontWeight: 600,
            fontSize: '24px',
            letterSpacing: '-0.5px'
          }}
        >
          {classInfo ? classInfo.name : '未知班级'}学生列表
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          align="center" 
          sx={{ 
            mb: 4, 
            color: '#86868b',
            fontSize: '14px',
          }}
        >
          {new Date().toLocaleDateString('zh-CN')} · 共{students.length}名学生 · 已完成{students.filter(s => s.completed).length}名
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#1d1d1f' }}>
            未完成 ({students.filter(s => !s.completed).length})
          </Typography>
          <Grid container spacing={2}>
            {students.filter(s => !s.completed).map((student) => (
              <Grid item xs={12} sm={6} key={student.id}>
                <Button
                  component={Link}
                  to={student.id === 1 ? "/teacher-form" : "#"}
                  variant="outlined"
                  fullWidth
                  sx={{
                    p: 2,
                    borderRadius: '12px',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    color: '#1d1d1f',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    '&:hover': {
                      borderColor: '#06c',
                      bgcolor: 'rgba(0, 122, 255, 0.05)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {student.name}
                    </Typography>
                    <Chip label="未填写" size="small" color="warning" />
                  </Box>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#1d1d1f' }}>
            已完成 ({students.filter(s => s.completed).length})
          </Typography>
          <Grid container spacing={2}>
            {students.filter(s => s.completed).map((student) => (
              <Grid item xs={12} sm={6} key={student.id}>
                <Button
                  component={Link}
                  to={student.id === 1 ? "/teacher-form" : "#"}
                  variant="outlined"
                  fullWidth
                  sx={{
                    p: 2,
                    borderRadius: '12px',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    color: '#1d1d1f',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    '&:hover': {
                      borderColor: '#06c',
                      bgcolor: 'rgba(0, 122, 255, 0.05)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {student.name}
                    </Typography>
                    <Chip label="已填写" size="small" color="success" />
                  </Box>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            component={Link}
            to="/teacher"
            sx={{
              color: '#06c',
              '&:hover': {
                bgcolor: 'rgba(0, 122, 255, 0.05)',
              },
            }}
          >
            返回班级列表
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f7' }}>
        <Routes>
          <Route path="/" element={
            <Container maxWidth="sm" sx={{ py: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: '#1d1d1f',
                    fontSize: '28px',
                    fontWeight: 600,
                    mb: 3
                  }}
                >
                  幼儿园日报系统
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button 
                    component={Link} 
                    to="/teacher" 
                    variant="contained"
                    sx={{
                      bgcolor: '#06c',
                      fontSize: '16px',
                      fontWeight: 500,
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        bgcolor: '#0055b3'
                      }
                    }}
                  >
                    老师入口
                  </Button>
                  <Button 
                    component={Link} 
                    to="/parent" 
                    variant="contained"
                    sx={{
                      bgcolor: '#06c',
                      fontSize: '16px',
                      fontWeight: 500,
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        bgcolor: '#0055b3'
                      }
                    }}
                  >
                    家长查看
                  </Button>
                </Box>
              </Box>
            </Container>
          } />
          <Route path="/teacher" element={<ClassList />} />
          <Route path="/class-students/:classId" element={<StudentList />} />
          <Route path="/teacher-form" element={<DailyRecordForm />} />
          <Route path="/parent" element={<DailyRecordView />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
