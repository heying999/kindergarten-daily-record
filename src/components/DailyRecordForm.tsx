import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Button,
  Box,
  Grid,
  FormLabel,
  FormGroup,
  MenuItem,
} from '@mui/material';
import { DailyRecord } from '../types/DailyRecord';

const initialRecord: DailyRecord = {
  className: '',
  studentName: '',
  date: new Date().toISOString().split('T')[0],
  recorder: '',
  healthStatus: {
    general: false,
    cough: false,
    runnyNose: false,
    diarrhea: false,
    vomit: false,
    other: false,
  },
  emotionalStatus: {
    happy: false,
    peaceful: false,
    interested: false,
    upset: false,
    energetic: false,
  },
  diningStatus: {
    amount: 'normal',
    speed: 'normal',
    hygiene: 'clean',
  },
  napStatus: {
    duration: '2',
    sleepQuality: 'independent',
  },
  toiletStatus: {
    urination: 0,
    defecation: 0,
    stoolQuality: 'normal',
    hygiene: 'independent',
  },
  waterIntake: {
    amount: '1000-1500',
    drinkingHabit: 'independent',
  },
  activities: {
    english: {
      attention: false,
      thinking: false,
      observation: false,
      cooperation: false,
      parentSignature: false,
      parentInteraction: false,
      participation: 'high',
    },
    language: {
      attention: false,
      thinking: false,
      observation: false,
      cooperation: false,
      parentSignature: false,
      parentInteraction: false,
      participation: 'high',
    },
    art: {
      attention: false,
      thinking: false,
      observation: false,
      cooperation: false,
      parentSignature: false,
      parentInteraction: false,
      participation: 'high',
    },
  },
  physicalActivities: {
    outdoor: {
      safetyAwareness: false,
      discipline: false,
      coordination: false,
      balance: false,
    },
    exercise: {
      safetyAwareness: false,
      discipline: false,
      coordination: false,
      balance: false,
    },
    sensoryTraining: {
      content: '',
      safetyAwareness: false,
      discipline: false,
      coordination: false,
      balance: false,
      cleanupHabit: false,
    },
  },
  lifeCare: {
    content: '学会正确的洗手方法，知道餐前、便后及手脏时要洗手。',
    status: 'independent',
  },
  etiquette: '入园时，能够主动跟老师、小朋友问好。离园时能够主动跟老师、小朋友们说再见。',
};

const DailyRecordForm: React.FC = () => {
  const [record, setRecord] = useState<DailyRecord>(initialRecord);

  useEffect(() => {
    const savedRecord = localStorage.getItem('dailyRecord');
    if (savedRecord) {
      setRecord(JSON.parse(savedRecord));
    }
  }, []);

  const handleChange = (
    section: keyof DailyRecord,
    field: string,
    value: any
  ) => {
    setRecord((prev) => {
      if (typeof prev[section] === 'object' && field) {
        const newRecord = {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
        localStorage.setItem('dailyRecord', JSON.stringify(newRecord));
        return newRecord;
      } else {
        const newRecord = {
          ...prev,
          [section]: value,
        };
        localStorage.setItem('dailyRecord', JSON.stringify(newRecord));
        return newRecord;
      }
    });
  };

  const handleNestedChange = (
    section: keyof DailyRecord,
    subSection: string,
    field: string,
    value: any
  ) => {
    setRecord((prev) => {
      const newRecord = {
        ...prev,
        [section]: {
          ...prev[section],
          [subSection]: {
            ...prev[section][subSection],
            [field]: value,
          },
        },
      };
      localStorage.setItem('dailyRecord', JSON.stringify(newRecord));
      return newRecord;
    });
  };

  return (
    <Container maxWidth="md">
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
            mb: 4, 
            color: '#1d1d1f', 
            fontWeight: 600,
            fontSize: '28px',
            letterSpacing: '-0.5px'
          }}
        >
          在园一日记录
        </Typography>

        {/* 1. 基本信息 */}
        <Box mb={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              bgcolor: 'rgba(0, 0, 0, 0.02)', 
              p: 2, 
              borderRadius: '12px',
              mb: 2 
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                m: 0,
                fontSize: '20px',
                fontWeight: 500,
                color: '#1d1d1f'
              }}
            >
              📋 基本信息
            </Typography>
          </Paper>
          <Box sx={{ px: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>班级</Typography>
                <Typography variant="h6">小一班</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>姓名</Typography>
                <Typography variant="h6">黄小东</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>日期</Typography>
                <Typography variant="h6">2025/3/15</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>记录人</Typography>
                <Typography variant="h6">牛老师</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* 2. 生活习惯 */}
        <Box mb={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              bgcolor: 'rgba(0, 0, 0, 0.02)', 
              p: 2, 
              borderRadius: '12px',
              mb: 2 
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                m: 0,
                fontSize: '20px',
                fontWeight: 500,
                color: '#1d1d1f'
              }}
            >
              🌞 生活习惯
            </Typography>
          </Paper>
          <Box sx={{ px: 2 }}>
            {/* 健康情况 */}
            <Box mb={3}>
              <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 2 }}>
                健康情况
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.healthStatus.general}
                      onChange={(e) =>
                        handleChange('healthStatus', 'general', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="良好"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.healthStatus.cough}
                      onChange={(e) =>
                        handleChange('healthStatus', 'cough', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="咳嗽"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.healthStatus.runnyNose}
                      onChange={(e) =>
                        handleChange('healthStatus', 'runnyNose', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="流涕"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.healthStatus.diarrhea}
                      onChange={(e) =>
                        handleChange('healthStatus', 'diarrhea', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="腹泻"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.healthStatus.vomit}
                      onChange={(e) =>
                        handleChange('healthStatus', 'vomit', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="呕吐"
                />
                <TextField
                  placeholder="其他"
                  size="small"
                  sx={{ ml: 2 }}
                  value={record.healthStatus.other || ''}
                  onChange={(e) =>
                    handleChange('healthStatus', 'other', e.target.value)
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#06c',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#06c',
                      },
                    },
                  }}
                />
              </FormGroup>
            </Box>

            {/* 饮食情况 */}
            <Box mb={3}>
              <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 2 }}>
                饮食情况
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">餐食食量</FormLabel>
                    <RadioGroup
                      row
                      value={record.diningStatus.amount}
                      onChange={(e) =>
                        handleChange('diningStatus', 'amount', e.target.value)
                      }
                      sx={{
                        '& .MuiRadio-root': {
                          color: '#06c',
                          '&.Mui-checked': {
                            color: '#06c',
                          },
                        },
                      }}
                    >
                      <FormControlLabel
                        value="good"
                        control={<Radio />}
                        label="佳（一碗）"
                      />
                      <FormControlLabel
                        value="normal"
                        control={<Radio />}
                        label="正常（三分之二碗）"
                      />
                      <FormControlLabel
                        value="poor"
                        control={<Radio />}
                        label="不佳（有挑食情况）"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">用餐速度</FormLabel>
                    <RadioGroup
                      row
                      value={record.diningStatus.speed}
                      onChange={(e) =>
                        handleChange('diningStatus', 'speed', e.target.value)
                      }
                      sx={{
                        '& .MuiRadio-root': {
                          color: '#06c',
                          '&.Mui-checked': {
                            color: '#06c',
                          },
                        },
                      }}
                    >
                      <FormControlLabel
                        value="fast"
                        control={<Radio />}
                        label="快（20min内）"
                      />
                      <FormControlLabel
                        value="normal"
                        control={<Radio />}
                        label="正常（30min内）"
                      />
                      <FormControlLabel
                        value="slow"
                        control={<Radio />}
                        label="慢（40min以上）"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">用餐卫生习惯</FormLabel>
                    <RadioGroup
                      row
                      value={record.diningStatus.hygiene}
                      onChange={(e) =>
                        handleChange('diningStatus', 'hygiene', e.target.value)
                      }
                      sx={{
                        '& .MuiRadio-root': {
                          color: '#06c',
                          '&.Mui-checked': {
                            color: '#06c',
                          },
                        },
                      }}
                    >
                      <FormControlLabel
                        value="clean"
                        control={<Radio />}
                        label="干净整洁"
                      />
                      <FormControlLabel
                        value="average"
                        control={<Radio />}
                        label="偶尔会洒"
                      />
                      <FormControlLabel
                        value="poor"
                        control={<Radio />}
                        label="桌面地面不整洁"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/* 午睡情况 */}
            <Box mb={3}>
              <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 2 }}>
                午睡情况
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">午睡时长</FormLabel>
                    <RadioGroup
                      row
                      value={record.napStatus.duration}
                      onChange={(e) =>
                        handleChange('napStatus', 'duration', e.target.value)
                      }
                      sx={{
                        '& .MuiRadio-root': {
                          color: '#06c',
                          '&.Mui-checked': {
                            color: '#06c',
                          },
                        },
                      }}
                    >
                      <FormControlLabel value="0" control={<Radio />} label="没睡" />
                      <FormControlLabel value="1" control={<Radio />} label="1小时" />
                      <FormControlLabel value="1.5" control={<Radio />} label="1.5小时" />
                      <FormControlLabel value="2" control={<Radio />} label="2小时以上" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">入睡情况</FormLabel>
                    <RadioGroup
                      row
                      value={record.napStatus.sleepQuality}
                      onChange={(e) =>
                        handleChange('napStatus', 'sleepQuality', e.target.value)
                      }
                      sx={{
                        '& .MuiRadio-root': {
                          color: '#06c',
                          '&.Mui-checked': {
                            color: '#06c',
                          },
                        },
                      }}
                    >
                      <FormControlLabel
                        value="independent"
                        control={<Radio />}
                        label="自主入睡"
                      />
                      <FormControlLabel
                        value="needsCompany"
                        control={<Radio />}
                        label="需要安抚"
                      />
                      <FormControlLabel
                        value="restless"
                        control={<Radio />}
                        label="辗转难入睡"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/* 如厕情况 */}
            <Box mb={3}>
              <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 2 }}>
                如厕情况
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="小便次数"
                    value={record.toiletStatus.urination}
                    onChange={(e) =>
                      handleChange('toiletStatus', 'urination', parseInt(e.target.value))
                    }
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#06c',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#06c',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="大便次数"
                    value={record.toiletStatus.defecation}
                    onChange={(e) =>
                      handleChange('toiletStatus', 'defecation', parseInt(e.target.value))
                    }
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#06c',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#06c',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">大便质量</FormLabel>
                    <RadioGroup
                      row
                      value={record.toiletStatus.stoolQuality}
                      onChange={(e) =>
                        handleChange('toiletStatus', 'stoolQuality', e.target.value)
                      }
                      sx={{
                        '& .MuiRadio-root': {
                          color: '#06c',
                          '&.Mui-checked': {
                            color: '#06c',
                          },
                        },
                      }}
                    >
                      <FormControlLabel value="hard" control={<Radio />} label="偏硬" />
                      <FormControlLabel value="normal" control={<Radio />} label="适中" />
                      <FormControlLabel value="soft" control={<Radio />} label="偏稀" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">卫生情况</FormLabel>
                    <RadioGroup
                      row
                      value={record.toiletStatus.hygiene}
                      onChange={(e) =>
                        handleChange('toiletStatus', 'hygiene', e.target.value)
                      }
                      sx={{
                        '& .MuiRadio-root': {
                          color: '#06c',
                          '&.Mui-checked': {
                            color: '#06c',
                          },
                        },
                      }}
                    >
                      <FormControlLabel
                        value="independent"
                        control={<Radio />}
                        label="能自己抹屁股"
                      />
                      <FormControlLabel
                        value="needsHelp"
                        control={<Radio />}
                        label="需要老师协助"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/* 饮水情况 */}
            <Box mb={3}>
              <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 2 }}>
                饮水情况
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">饮水量</FormLabel>
                    <RadioGroup
                      row
                      value={record.waterIntake.amount}
                      onChange={(e) =>
                        handleChange('waterIntake', 'amount', e.target.value)
                      }
                      sx={{
                        '& .MuiRadio-root': {
                          color: '#06c',
                          '&.Mui-checked': {
                            color: '#06c',
                          },
                        },
                      }}
                    >
                      <FormControlLabel
                        value="500-1000"
                        control={<Radio />}
                        label="500-1000ml"
                      />
                      <FormControlLabel
                        value="1000-1500"
                        control={<Radio />}
                        label="1000-1500ml"
                      />
                      <FormControlLabel
                        value="1500+"
                        control={<Radio />}
                        label="1500ml以上"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">饮水情况</FormLabel>
                    <RadioGroup
                      row
                      value={record.waterIntake.drinkingHabit}
                      onChange={(e) =>
                        handleChange('waterIntake', 'drinkingHabit', e.target.value)
                      }
                      sx={{
                        '& .MuiRadio-root': {
                          color: '#06c',
                          '&.Mui-checked': {
                            color: '#06c',
                          },
                        },
                      }}
                    >
                      <FormControlLabel
                        value="independent"
                        control={<Radio />}
                        label="自主饮水"
                      />
                      <FormControlLabel
                        value="needsReminder"
                        control={<Radio />}
                        label="需要提醒"
                      />
                      <FormControlLabel
                        value="avoidance"
                        control={<Radio />}
                        label="逃避喝水"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>

        {/* 3. 学习活动 */}
        <Box mb={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              bgcolor: 'rgba(0, 0, 0, 0.02)', 
              p: 2, 
              borderRadius: '12px',
              mb: 2 
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                m: 0,
                fontSize: '20px',
                fontWeight: 500,
                color: '#1d1d1f'
              }}
            >
              📚 学习活动
            </Typography>
          </Paper>
          <Box sx={{ px: 2 }}>
            {/* 英语活动 */}
            <Box mb={3}>
              <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 2 }}>
                英语活动
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel component="legend">活动内容</FormLabel>
                <TextField
                  select
                  value={record.activities.english.content || ''}
                  onChange={(e) =>
                    handleNestedChange('activities', 'english', 'content', e.target.value)
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#06c',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#06c',
                      },
                    },
                  }}
                >
                  <MenuItem value="animal">《Animal》通过系列英语游戏，沉浸式学习动物单词，了解动物知识。</MenuItem>
                </TextField>
              </FormControl>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.activities.english.attention}
                      onChange={(e) =>
                        handleNestedChange('activities', 'english', 'attention', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="专注力"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.activities.english.thinking}
                      onChange={(e) =>
                        handleNestedChange('activities', 'english', 'thinking', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="思考力"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.activities.english.observation}
                      onChange={(e) =>
                        handleNestedChange('activities', 'english', 'observation', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="观察能力"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.activities.english.cooperation}
                      onChange={(e) =>
                        handleNestedChange('activities', 'english', 'cooperation', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="合作情况"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.activities.english.parentInteraction}
                      onChange={(e) =>
                        handleNestedChange('activities', 'english', 'parentInteraction', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="亲子互动"
                />
              </FormGroup>
              <FormControl component="fieldset" sx={{ mt: 1 }}>
                <FormLabel component="legend">参与程度</FormLabel>
                <RadioGroup
                  row
                  value={record.activities.english.participation}
                  onChange={(e) =>
                    handleNestedChange('activities', 'english', 'participation', e.target.value)
                  }
                  sx={{
                    '& .MuiRadio-root': {
                      color: '#06c',
                      '&.Mui-checked': {
                        color: '#06c',
                      },
                    },
                  }}
                >
                  <FormControlLabel value="high" control={<Radio />} label="高" />
                  <FormControlLabel value="needsEffort" control={<Radio />} label="需努力" />
                  <FormControlLabel value="moderate" control={<Radio />} label="看情况参与" />
                  <FormControlLabel value="poor" control={<Radio />} label="不愿参与" />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* 语言活动 */}
            <Box mb={3}>
              <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 2 }}>
                语言活动
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel component="legend">活动内容</FormLabel>
                <TextField
                  select
                  value={record.activities.language.content || ''}
                  onChange={(e) =>
                    handleNestedChange('activities', 'language', 'content', e.target.value)
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#06c',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#06c',
                      },
                    },
                  }}
                >
                  <MenuItem value="songDynasty">《宋代四雅》初尝试宋代品茶茗香活动。</MenuItem>
                </TextField>
              </FormControl>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.activities.language.attention}
                      onChange={(e) =>
                        handleNestedChange('activities', 'language', 'attention', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="专注力"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.activities.language.thinking}
                      onChange={(e) =>
                        handleNestedChange('activities', 'language', 'thinking', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="思考力"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.activities.language.observation}
                      onChange={(e) =>
                        handleNestedChange('activities', 'language', 'observation', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="观察能力"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.activities.language.cooperation}
                      onChange={(e) =>
                        handleNestedChange('activities', 'language', 'cooperation', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="合作情况"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.activities.language.parentInteraction}
                      onChange={(e) =>
                        handleNestedChange('activities', 'language', 'parentInteraction', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="亲子互动"
                />
              </FormGroup>
              <FormControl component="fieldset" sx={{ mt: 1 }}>
                <FormLabel component="legend">参与程度</FormLabel>
                <RadioGroup
                  row
                  value={record.activities.language.participation}
                  onChange={(e) =>
                    handleNestedChange('activities', 'language', 'participation', e.target.value)
                  }
                  sx={{
                    '& .MuiRadio-root': {
                      color: '#06c',
                      '&.Mui-checked': {
                        color: '#06c',
                      },
                    },
                  }}
                >
                  <FormControlLabel value="high" control={<Radio />} label="高" />
                  <FormControlLabel value="needsEffort" control={<Radio />} label="需努力" />
                  <FormControlLabel value="moderate" control={<Radio />} label="看情况参与" />
                  <FormControlLabel value="poor" control={<Radio />} label="不愿参与" />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* 艺术活动 */}
            <Box mb={3}>
              <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 2 }}>
                艺术活动
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel component="legend">活动内容</FormLabel>
                <TextField
                  select
                  value={record.activities.art.content || ''}
                  onChange={(e) =>
                    handleNestedChange('activities', 'art', 'content', e.target.value)
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#06c',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#06c',
                      },
                    },
                  }}
                >
                  <MenuItem value="invitation">《装饰邀请函》感受线描的美，尝试运用不同粗细的笔进行装饰。</MenuItem>
                </TextField>
              </FormControl>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.activities.art.attention}
                      onChange={(e) =>
                        handleNestedChange('activities', 'art', 'attention', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="专注力"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.activities.art.thinking}
                      onChange={(e) =>
                        handleNestedChange('activities', 'art', 'thinking', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="思考力"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.activities.art.observation}
                      onChange={(e) =>
                        handleNestedChange('activities', 'art', 'observation', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="观察能力"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.activities.art.cooperation}
                      onChange={(e) =>
                        handleNestedChange('activities', 'art', 'cooperation', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="合作情况"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.activities.art.parentInteraction}
                      onChange={(e) =>
                        handleNestedChange('activities', 'art', 'parentInteraction', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="亲子互动"
                />
              </FormGroup>
              <FormControl component="fieldset" sx={{ mt: 1 }}>
                <FormLabel component="legend">参与程度</FormLabel>
                <RadioGroup
                  row
                  value={record.activities.art.participation}
                  onChange={(e) =>
                    handleNestedChange('activities', 'art', 'participation', e.target.value)
                  }
                  sx={{
                    '& .MuiRadio-root': {
                      color: '#06c',
                      '&.Mui-checked': {
                        color: '#06c',
                      },
                    },
                  }}
                >
                  <FormControlLabel value="high" control={<Radio />} label="高" />
                  <FormControlLabel value="needsEffort" control={<Radio />} label="需努力" />
                  <FormControlLabel value="moderate" control={<Radio />} label="看情况参与" />
                  <FormControlLabel value="poor" control={<Radio />} label="不愿参与" />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </Box>

        {/* 4. 体能活动 */}
        <Box mb={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              bgcolor: 'rgba(0, 0, 0, 0.02)', 
              p: 2, 
              borderRadius: '12px',
              mb: 2 
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                m: 0,
                fontSize: '20px',
                fontWeight: 500,
                color: '#1d1d1f'
              }}
            >
              🏃‍♂️ 体能活动
            </Typography>
          </Paper>
          <Box sx={{ px: 2 }}>
            {/* 户外活动 */}
            <Box mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                户外活动
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel component="legend">活动内容</FormLabel>
                <TextField
                  select
                  value={record.physicalActivities.outdoor.content || ''}
                  onChange={(e) =>
                    handleNestedChange('physicalActivities', 'outdoor', 'content', e.target.value)
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#06c',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#06c',
                      },
                    },
                  }}
                >
                  <MenuItem value="running">跑步关键指标：（1）20米快速跑  （2）100米绕障碍物跑。</MenuItem>
                </TextField>
              </FormControl>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.physicalActivities.outdoor.safetyAwareness}
                      onChange={(e) =>
                        handleNestedChange('physicalActivities', 'outdoor', 'safetyAwareness', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="安全意识"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.physicalActivities.outdoor.discipline}
                      onChange={(e) =>
                        handleNestedChange('physicalActivities', 'outdoor', 'discipline', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="纪律性"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.physicalActivities.outdoor.coordination}
                      onChange={(e) =>
                        handleNestedChange('physicalActivities', 'outdoor', 'coordination', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="协调性"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.physicalActivities.outdoor.balance}
                      onChange={(e) =>
                        handleNestedChange('physicalActivities', 'outdoor', 'balance', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="平衡性"
                />
              </FormGroup>
            </Box>

            {/* 运动技能（原体育锻炼） */}
            <Box mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                运动技能
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel component="legend">活动内容</FormLabel>
                <TextField
                  select
                  value={record.physicalActivities.exercise.content || ''}
                  onChange={(e) =>
                    handleNestedChange('physicalActivities', 'exercise', 'content', e.target.value)
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#06c',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#06c',
                      },
                    },
                  }}
                >
                  <MenuItem value="hanging">双手抓杠悬空吊起15秒</MenuItem>
                </TextField>
              </FormControl>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.physicalActivities.exercise.safetyAwareness}
                      onChange={(e) =>
                        handleNestedChange('physicalActivities', 'exercise', 'safetyAwareness', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="安全意识"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.physicalActivities.exercise.discipline}
                      onChange={(e) =>
                        handleNestedChange('physicalActivities', 'exercise', 'discipline', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="纪律性"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.physicalActivities.exercise.coordination}
                      onChange={(e) =>
                        handleNestedChange('physicalActivities', 'exercise', 'coordination', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="协调性"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.physicalActivities.exercise.balance}
                      onChange={(e) =>
                        handleNestedChange('physicalActivities', 'exercise', 'balance', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="平衡性"
                />
              </FormGroup>
            </Box>

            {/* 感统训练 */}
            <Box mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                感统训练
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel component="legend">活动内容</FormLabel>
                <TextField
                  select
                  value={record.physicalActivities.sensoryTraining.content || ''}
                  onChange={(e) =>
                    handleNestedChange('physicalActivities', 'sensoryTraining', 'content', e.target.value)
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#06c',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#06c',
                      },
                    },
                  }}
                >
                  <MenuItem value="crawling">《支撑爬行运球》锻炼幼儿身体稳定性、上肢支撑力、增强腰腹力量。</MenuItem>
                </TextField>
              </FormControl>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.physicalActivities.sensoryTraining.safetyAwareness}
                      onChange={(e) =>
                        handleNestedChange('physicalActivities', 'sensoryTraining', 'safetyAwareness', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="安全意识"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.physicalActivities.sensoryTraining.cleanupHabit}
                      onChange={(e) =>
                        handleNestedChange('physicalActivities', 'sensoryTraining', 'cleanupHabit', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="收拾习惯"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.physicalActivities.sensoryTraining.coordination}
                      onChange={(e) =>
                        handleNestedChange('physicalActivities', 'sensoryTraining', 'coordination', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="协调能力"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={record.physicalActivities.sensoryTraining.balance}
                      onChange={(e) =>
                        handleNestedChange('physicalActivities', 'sensoryTraining', 'balance', e.target.checked)
                      }
                      sx={{
                        color: '#06c',
                        '&.Mui-checked': {
                          color: '#06c',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="平衡能力"
                />
              </FormGroup>
            </Box>
          </Box>
        </Box>

        {/* 5. 品行美德 */}
        <Box mb={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              bgcolor: 'rgba(0, 0, 0, 0.02)', 
              p: 2, 
              borderRadius: '12px',
              mb: 2 
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                m: 0,
                fontSize: '20px',
                fontWeight: 500,
                color: '#1d1d1f'
              }}
            >
              🌟 品行美德
            </Typography>
          </Paper>
          <Box sx={{ px: 2 }}>
            {/* 生活自理 */}
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                生活自理
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel component="legend">学会</FormLabel>
                <TextField
                  select
                  value={record.lifeCare.content}
                  onChange={(e) => handleChange('lifeCare', 'content', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#06c',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#06c',
                      },
                    },
                  }}
                >
                  <MenuItem value="学会正确的洗手方法，知道餐前、便后及手脏时要洗手。">
                    学会正确的洗手方法，知道餐前、便后及手脏时要洗手。
                  </MenuItem>
                </TextField>
              </FormControl>
              <FormControl component="fieldset">
                <FormLabel component="legend">完成情况</FormLabel>
                <RadioGroup
                  row
                  value={record.lifeCare.status}
                  onChange={(e) => handleChange('lifeCare', 'status', e.target.value)}
                  sx={{
                    '& .MuiRadio-root': {
                      color: '#06c',
                      '&.Mui-checked': {
                        color: '#06c',
                      },
                    },
                  }}
                >
                  <FormControlLabel
                    value="independent"
                    control={<Radio />}
                    label="独立完成"
                  />
                  <FormControlLabel
                    value="basicComplete"
                    control={<Radio />}
                    label="基本完成"
                  />
                  <FormControlLabel
                    value="needsReminder"
                    control={<Radio />}
                    label="需要提醒"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* 礼仪习惯 */}
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                礼仪习惯
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="礼仪表现"
                value={record.etiquette}
                onChange={(e) => handleChange('etiquette', '', e.target.value)}
                placeholder="入园时，能够主动跟老师、小朋友问好。离园时能够主动跟老师、小朋友们说再见。"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#06c',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#06c',
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* 保存按钮 */}
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              localStorage.setItem('dailyRecord', JSON.stringify(record));
              alert('保存成功！');
            }}
            sx={{
              minWidth: 200,
              height: '48px',
              borderRadius: '24px',
              bgcolor: '#06c',
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#0055b3',
                boxShadow: 'none',
              },
            }}
          >
            保存记录
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default DailyRecordForm; 