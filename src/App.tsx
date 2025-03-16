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
    return Math.floor(Math.random() * classData.find(c => c.id === classId)!.count);
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* 顶部栏 */}
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid rgba(0,0,0,0.12)',
        bgcolor: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#1d1d1f', 
            fontWeight: 500,
            fontSize: '20px',
            mb: 2
          }}
        >
          班级列表
        </Typography>
        <TextField
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          fullWidth
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            }
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      {/* 班级列表 */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto', 
        px: 2,
        py: 1
      }}>
        <Accordion 
          defaultExpanded 
          elevation={0}
          sx={{
            '&:before': {
              display: 'none',
            },
            borderRadius: '12px',
            mb: 1,
            '& .MuiAccordionSummary-root': {
              borderRadius: '12px',
              '&.Mui-expanded': {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
            }
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: 'rgba(26, 115, 232, 0.04)',
            }}
          >
            <Typography sx={{ fontWeight: 500, color: '#1a73e8' }}>
              小小班 ({tinyClasses.length}个班)
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 1 }}>
            {tinyClasses.map((classItem) => {
              const completedCount = getCompletedCount(classItem.id);
              return (
                <Button
                  key={classItem.id}
                  component={Link}
                  to={`/class-students/${classItem.id}`}
                  fullWidth
                  sx={{
                    p: 2,
                    mb: 1,
                    borderRadius: '12px',
                    bgcolor: '#fff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                    color: '#1d1d1f',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#fff',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      mb: 1 
                    }}>
                      <Typography sx={{ 
                        fontSize: '16px', 
                        fontWeight: 500 
                      }}>
                        {classItem.name}
                      </Typography>
                      <Chip 
                        label={`${completedCount}/${classItem.count}`} 
                        size="small" 
                        color={completedCount === classItem.count ? "success" : "default"}
                        sx={{ height: '24px' }}
                      />
                    </Box>
                    <Box sx={{ 
                      height: 4, 
                      bgcolor: 'rgba(0,0,0,0.08)', 
                      borderRadius: 2, 
                      overflow: 'hidden' 
                    }}>
                      <Box 
                        sx={{ 
                          height: '100%', 
                          width: `${(completedCount / classItem.count) * 100}%`,
                          bgcolor: completedCount === classItem.count ? '#4caf50' : '#1a73e8',
                          borderRadius: 2
                        }} 
                      />
                    </Box>
                  </Box>
                </Button>
              );
            })}
          </AccordionDetails>
        </Accordion>

        <Accordion 
          defaultExpanded 
          elevation={0}
          sx={{
            '&:before': {
              display: 'none',
            },
            borderRadius: '12px',
            mb: 1,
            '& .MuiAccordionSummary-root': {
              borderRadius: '12px',
              '&.Mui-expanded': {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
            }
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: 'rgba(26, 115, 232, 0.04)',
            }}
          >
            <Typography sx={{ fontWeight: 500, color: '#1a73e8' }}>
              小班 ({smallClasses.length}个班)
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 1 }}>
            {smallClasses.map((classItem) => {
              const completedCount = getCompletedCount(classItem.id);
              return (
                <Button
                  key={classItem.id}
                  component={Link}
                  to={`/class-students/${classItem.id}`}
                  fullWidth
                  sx={{
                    p: 2,
                    mb: 1,
                    borderRadius: '12px',
                    bgcolor: '#fff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                    color: '#1d1d1f',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#fff',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      mb: 1 
                    }}>
                      <Typography sx={{ 
                        fontSize: '16px', 
                        fontWeight: 500 
                      }}>
                        {classItem.name}
                      </Typography>
                      <Chip 
                        label={`${completedCount}/${classItem.count}`} 
                        size="small" 
                        color={completedCount === classItem.count ? "success" : "default"}
                        sx={{ height: '24px' }}
                      />
                    </Box>
                    <Box sx={{ 
                      height: 4, 
                      bgcolor: 'rgba(0,0,0,0.08)', 
                      borderRadius: 2, 
                      overflow: 'hidden' 
                    }}>
                      <Box 
                        sx={{ 
                          height: '100%', 
                          width: `${(completedCount / classItem.count) * 100}%`,
                          bgcolor: completedCount === classItem.count ? '#4caf50' : '#1a73e8',
                          borderRadius: 2
                        }} 
                      />
                    </Box>
                  </Box>
                </Button>
              );
            })}
          </AccordionDetails>
        </Accordion>

        <Accordion 
          defaultExpanded 
          elevation={0}
          sx={{
            '&:before': {
              display: 'none',
            },
            borderRadius: '12px',
            mb: 1,
            '& .MuiAccordionSummary-root': {
              borderRadius: '12px',
              '&.Mui-expanded': {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
            }
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: 'rgba(26, 115, 232, 0.04)',
            }}
          >
            <Typography sx={{ fontWeight: 500, color: '#1a73e8' }}>
              中班 ({mediumClasses.length}个班)
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 1 }}>
            {mediumClasses.map((classItem) => {
              const completedCount = getCompletedCount(classItem.id);
              return (
                <Button
                  key={classItem.id}
                  component={Link}
                  to={`/class-students/${classItem.id}`}
                  fullWidth
                  sx={{
                    p: 2,
                    mb: 1,
                    borderRadius: '12px',
                    bgcolor: '#fff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                    color: '#1d1d1f',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#fff',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      mb: 1 
                    }}>
                      <Typography sx={{ 
                        fontSize: '16px', 
                        fontWeight: 500 
                      }}>
                        {classItem.name}
                      </Typography>
                      <Chip 
                        label={`${completedCount}/${classItem.count}`} 
                        size="small" 
                        color={completedCount === classItem.count ? "success" : "default"}
                        sx={{ height: '24px' }}
                      />
                    </Box>
                    <Box sx={{ 
                      height: 4, 
                      bgcolor: 'rgba(0,0,0,0.08)', 
                      borderRadius: 2, 
                      overflow: 'hidden' 
                    }}>
                      <Box 
                        sx={{ 
                          height: '100%', 
                          width: `${(completedCount / classItem.count) * 100}%`,
                          bgcolor: completedCount === classItem.count ? '#4caf50' : '#1a73e8',
                          borderRadius: 2
                        }} 
                      />
                    </Box>
                  </Box>
                </Button>
              );
            })}
          </AccordionDetails>
        </Accordion>

        <Accordion 
          defaultExpanded 
          elevation={0}
          sx={{
            '&:before': {
              display: 'none',
            },
            borderRadius: '12px',
            mb: 1,
            '& .MuiAccordionSummary-root': {
              borderRadius: '12px',
              '&.Mui-expanded': {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
            }
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: 'rgba(26, 115, 232, 0.04)',
            }}
          >
            <Typography sx={{ fontWeight: 500, color: '#1a73e8' }}>
              大班 ({largeClasses.length}个班)
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 1 }}>
            {largeClasses.map((classItem) => {
              const completedCount = getCompletedCount(classItem.id);
              return (
                <Button
                  key={classItem.id}
                  component={Link}
                  to={`/class-students/${classItem.id}`}
                  fullWidth
                  sx={{
                    p: 2,
                    mb: 1,
                    borderRadius: '12px',
                    bgcolor: '#fff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                    color: '#1d1d1f',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#fff',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      mb: 1 
                    }}>
                      <Typography sx={{ 
                        fontSize: '16px', 
                        fontWeight: 500 
                      }}>
                        {classItem.name}
                      </Typography>
                      <Chip 
                        label={`${completedCount}/${classItem.count}`} 
                        size="small" 
                        color={completedCount === classItem.count ? "success" : "default"}
                        sx={{ height: '24px' }}
                      />
                    </Box>
                    <Box sx={{ 
                      height: 4, 
                      bgcolor: 'rgba(0,0,0,0.08)', 
                      borderRadius: 2, 
                      overflow: 'hidden' 
                    }}>
                      <Box 
                        sx={{ 
                          height: '100%', 
                          width: `${(completedCount / classItem.count) * 100}%`,
                          bgcolor: completedCount === classItem.count ? '#4caf50' : '#1a73e8',
                          borderRadius: 2
                        }} 
                      />
                    </Box>
                  </Box>
                </Button>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* 底部导航栏 */}
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid rgba(0,0,0,0.12)',
        bgcolor: '#fff'
      }}>
        <Button
          component={Link}
          to="/"
          fullWidth
          variant="text"
          sx={{
            color: '#1a73e8',
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'rgba(26, 115, 232, 0.04)',
            },
          }}
        >
          返回首页
        </Button>
      </Box>
    </Box>
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
        name: i === 1 ? "黄小东" : `学生${i}`,
        className: className,
        completed: completed
      });
    }
    return students;
  };

  const classInfo = classData.find(c => c.id === parseInt(classId));
  const students = generateStudents(classInfo ? classInfo.count : 20, classId);

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* 顶部栏 */}
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid rgba(0,0,0,0.12)',
        bgcolor: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#1d1d1f', 
            fontWeight: 500,
            fontSize: '20px',
            mb: 1
          }}
        >
          {classInfo ? classInfo.name : '未知班级'}学生列表
        </Typography>
        
        <Typography 
          variant="body2"
          sx={{ 
            color: '#86868b',
            fontSize: '14px',
          }}
        >
          {new Date().toLocaleDateString('zh-CN')} · 共{students.length}名学生 · 已完成{students.filter(s => s.completed).length}名
        </Typography>
      </Box>

      {/* 学生列表 */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        px: 2,
        py: 1
      }}>
        {/* 未完成列表 */}
        <Typography 
          variant="subtitle2" 
          sx={{ 
            mb: 1, 
            fontWeight: 500, 
            color: '#1d1d1f',
            fontSize: '14px'
          }}
        >
          未完成 ({students.filter(s => !s.completed).length})
        </Typography>
        <Box sx={{ mb: 3 }}>
          {students.filter(s => !s.completed).map((student) => (
            <Button
              key={student.id}
              component={Link}
              to={student.id === 1 ? "/teacher-form" : "#"}
              fullWidth
              sx={{
                p: 2,
                mb: 1,
                borderRadius: '12px',
                bgcolor: '#fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                color: '#1d1d1f',
                justifyContent: 'flex-start',
                textAlign: 'left',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#fff',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                },
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                width: '100%' 
              }}>
                <Typography sx={{ fontWeight: 500 }}>
                  {student.name}
                </Typography>
                <Chip 
                  label="未填写" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(255, 171, 0, 0.08)',
                    color: '#B76E00',
                    height: '24px',
                    '& .MuiChip-label': {
                      px: 1,
                    }
                  }} 
                />
              </Box>
            </Button>
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* 已完成列表 */}
        <Typography 
          variant="subtitle2" 
          sx={{ 
            mb: 1, 
            fontWeight: 500, 
            color: '#1d1d1f',
            fontSize: '14px'
          }}
        >
          已完成 ({students.filter(s => s.completed).length})
        </Typography>
        <Box>
          {students.filter(s => s.completed).map((student) => (
            <Button
              key={student.id}
              component={Link}
              to={student.id === 1 ? "/teacher-form" : "#"}
              fullWidth
              sx={{
                p: 2,
                mb: 1,
                borderRadius: '12px',
                bgcolor: '#fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                color: '#1d1d1f',
                justifyContent: 'flex-start',
                textAlign: 'left',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#fff',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                },
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                width: '100%' 
              }}>
                <Typography sx={{ fontWeight: 500 }}>
                  {student.name}
                </Typography>
                <Chip 
                  label="已填写" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(76, 175, 80, 0.08)',
                    color: '#1B5E20',
                    height: '24px',
                    '& .MuiChip-label': {
                      px: 1,
                    }
                  }} 
                />
              </Box>
            </Button>
          ))}
        </Box>
      </Box>

      {/* 底部导航栏 */}
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid rgba(0,0,0,0.12)',
        bgcolor: '#fff'
      }}>
        <Button
          component={Link}
          to="/teacher"
          fullWidth
          variant="text"
          sx={{
            color: '#1a73e8',
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'rgba(26, 115, 232, 0.04)',
            },
          }}
        >
          返回班级列表
        </Button>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: '#ffffff',
        maxWidth: '390px',
        margin: '0 auto',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        position: 'relative'
      }}>
        <Routes>
          <Route path="/" element={
            <Box sx={{ 
              height: '100vh', 
              display: 'flex', 
              flexDirection: 'column',
              p: 0,
              background: '#ffffff'
            }}>
              <Box sx={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                pt: '25vh',
                px: 4,
                gap: 6
              }}>
                {/* Logo和标题区域 */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: '#000000',
                      fontSize: '56px',
                      fontWeight: 700,
                      mb: 1,
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    幼苗🌱日记
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(0, 0, 0, 0.6)',
                      fontSize: '16px',
                      fontWeight: 500,
                      mb: 3
                    }}
                  >
                    记录每一天的成长点滴
                  </Typography>
                </Box>

                {/* 入口卡片区域 */}
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 3
                }}>
                  <Button 
                    component={Link} 
                    to="/teacher" 
                    sx={{
                      display: 'flex',
                      alignItems: 'stretch',
                      bgcolor: '#ffffff',
                      p: 0,
                      height: '120px',
                      borderRadius: '16px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      textTransform: 'none',
                      overflow: 'hidden',
                      '&:hover': {
                        bgcolor: '#f5f5f5',
                        color: '#000000',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/teacher.png"
                      alt="老师"
                      sx={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    />
                    <Box sx={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      pl: 3
                    }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#000000',
                          fontWeight: 600,
                          fontSize: '20px',
                          mb: 1
                        }}
                      >
                        我是老师
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(0, 0, 0, 0.6)',
                          fontSize: '14px'
                        }}
                      >
                        记录学生的每日表现
                      </Typography>
                    </Box>
                  </Button>

                  <Button 
                    component={Link} 
                    to="/parent" 
                    sx={{
                      display: 'flex',
                      alignItems: 'stretch',
                      bgcolor: '#ffffff',
                      p: 0,
                      height: '120px',
                      borderRadius: '16px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      textTransform: 'none',
                      overflow: 'hidden',
                      '&:hover': {
                        bgcolor: '#f5f5f5',
                        color: '#000000',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/parent.png"
                      alt="家长"
                      sx={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    />
                    <Box sx={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      pl: 3
                    }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#000000',
                          fontWeight: 600,
                          fontSize: '20px',
                          mb: 1
                        }}
                      >
                        我是家长
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(0, 0, 0, 0.6)',
                          fontSize: '14px'
                        }}
                      >
                        查看孩子的每日表现
                      </Typography>
                    </Box>
                  </Button>
                </Box>
              </Box>
            </Box>
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
