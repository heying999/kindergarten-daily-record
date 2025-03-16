import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
} from '@mui/material';
import { DailyRecord } from '../types/DailyRecord';

const DailyRecordView: React.FC = () => {
  const [record, setRecord] = useState<DailyRecord | null>(null);

  useEffect(() => {
    const savedRecord = localStorage.getItem('dailyRecord');
    if (savedRecord) {
      setRecord(JSON.parse(savedRecord));
    }
  }, []);

  if (!record) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            暂无日报信息
          </Typography>
        </Box>
      </Container>
    );
  }

  const renderHealthStatus = () => {
    const items = [];
    if (record.healthStatus.general) items.push('身体状况良好');
    if (record.healthStatus.cough) items.push('有咳嗽');
    if (record.healthStatus.runnyNose) items.push('有流涕');
    if (record.healthStatus.diarrhea) items.push('有腹泻');
    if (record.healthStatus.vomit) items.push('有呕吐');
    if (record.healthStatus.other) items.push(`其他：${record.healthStatus.other}`);
    return items.length > 0 ? items.join('，') : '身体状况良好';
  };

  const renderEmotionalStatus = () => {
    const items = [];
    if (record.emotionalStatus.happy) items.push('开心');
    if (record.emotionalStatus.peaceful) items.push('平和');
    if (record.emotionalStatus.interested) items.push('有兴趣');
    if (record.emotionalStatus.upset) items.push('不安');
    if (record.emotionalStatus.energetic) items.push('活力充沛');
    return items.length > 0 ? items.join('，') : '情绪稳定';
  };

  const getParticipationStars = (status: string) => {
    switch (status) {
      case 'high': return <Box sx={{ color: '#FFD700', fontSize: '18px' }}>★★★★★</Box>;
      case 'needsEffort': return <Box sx={{ color: '#FFD700', fontSize: '18px' }}>★★★☆☆</Box>;
      case 'moderate': return <Box sx={{ color: '#FFD700', fontSize: '18px' }}>★★☆☆☆</Box>;
      case 'poor': return <Box sx={{ color: '#FFD700', fontSize: '18px' }}>★☆☆☆☆</Box>;
      default: return <Box sx={{ color: '#FFD700', fontSize: '18px' }}>☆☆☆☆☆</Box>;
    }
  };

  return (
    <Container maxWidth="sm">
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
        {/* 标题部分 */}
        <Box mb={4} textAlign="center">
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#1d1d1f',
              fontSize: '24px',
              fontWeight: 600,
              letterSpacing: '-0.5px'
            }}
          >
            黄小东的一日记录
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mt: 1,
              color: '#86868b',
              fontSize: '15px'
            }}
          >
            {record.className} · {record.date} · {record.recorder}
          </Typography>
        </Box>

        {/* 健康状况 */}
        <Box mb={4}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '17px',
              fontWeight: 600,
              color: '#1d1d1f',
              mb: 2
            }}
          >
            健康状况
          </Typography>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2,
              bgcolor: 'rgba(0, 0, 0, 0.02)',
              borderRadius: '12px'
            }}
          >
            <Typography variant="body1">
              {renderHealthStatus()}
            </Typography>
          </Paper>
        </Box>

        {/* 情绪状态 */}
        <Box mb={4}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '17px',
              fontWeight: 600,
              color: '#1d1d1f',
              mb: 2
            }}
          >
            今日情绪
          </Typography>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2,
              bgcolor: 'rgba(0, 0, 0, 0.02)',
              borderRadius: '12px'
            }}
          >
            <Typography variant="body1">
              {renderEmotionalStatus()}
            </Typography>
          </Paper>
        </Box>

        {/* 生活习惯 */}
        <Box mb={4}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '17px',
              fontWeight: 600,
              color: '#1d1d1f',
              mb: 2
            }}
          >
            生活习惯
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2,
                  bgcolor: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: '12px'
                }}
              >
                <Typography variant="subtitle2" sx={{ color: '#86868b', mb: 1 }}>
                  用餐情况
                </Typography>
                <Typography variant="body1" paragraph>
                  食量：{record.diningStatus.amount === 'good' ? '佳（一碗）' : 
                         record.diningStatus.amount === 'normal' ? '正常（三分之二碗）' : 
                         '不佳（有挑食情况）'}
                </Typography>
                <Typography variant="body1" paragraph>
                  速度：{record.diningStatus.speed === 'fast' ? '快（20min内）' :
                         record.diningStatus.speed === 'normal' ? '正常（30min内）' :
                         '慢（40min以上）'}
                </Typography>
                <Typography variant="body1">
                  卫生：{record.diningStatus.hygiene === 'clean' ? '干净整洁' :
                         record.diningStatus.hygiene === 'average' ? '偶尔会洒' :
                         '桌面地面不整洁'}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2,
                  bgcolor: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: '12px'
                }}
              >
                <Typography variant="subtitle2" sx={{ color: '#86868b', mb: 1 }}>
                  午睡情况
                </Typography>
                <Typography variant="body1" paragraph>
                  时长：{record.napStatus.duration === '0' ? '没睡' :
                         record.napStatus.duration === '1' ? '1小时' :
                         record.napStatus.duration === '1.5' ? '1.5小时' :
                         '2小时以上'}
                </Typography>
                <Typography variant="body1">
                  入睡：{record.napStatus.sleepQuality === 'independent' ? '自主入睡' :
                         record.napStatus.sleepQuality === 'needsCompany' ? '需要安抚' :
                         '辗转难入睡'}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2,
                  bgcolor: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: '12px'
                }}
              >
                <Typography variant="subtitle2" sx={{ color: '#86868b', mb: 1 }}>
                  如厕情况
                </Typography>
                <Typography variant="body1" paragraph>
                  小便 {record.toiletStatus.urination} 次，
                  大便 {record.toiletStatus.defecation} 次
                </Typography>
                <Typography variant="body1" paragraph>
                  大便质地：{record.toiletStatus.stoolQuality === 'hard' ? '偏硬' :
                           record.toiletStatus.stoolQuality === 'normal' ? '适中' :
                           '偏稀'}
                </Typography>
                <Typography variant="body1">
                  卫生情况：{record.toiletStatus.hygiene === 'independent' ? '能自己抹屁股' : '需要老师协助'}
                </Typography>
              </Paper>
            </Grid>

            {/* 饮水情况 */}
            <Grid item xs={12}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2,
                  bgcolor: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: '12px'
                }}
              >
                <Typography variant="subtitle2" sx={{ color: '#86868b', mb: 1 }}>
                  饮水情况
                </Typography>
                <Typography variant="body1" paragraph>
                  饮水量：{record.waterIntake.amount === '500-1000' ? '500-1000ml' :
                          record.waterIntake.amount === '1000-1500' ? '1000-1500ml' :
                          '1500ml以上'}
                </Typography>
                <Typography variant="body1">
                  饮水习惯：{record.waterIntake.drinkingHabit === 'independent' ? '能自主饮水' :
                           record.waterIntake.drinkingHabit === 'reminded' ? '需要提醒' :
                           '需要协助'}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* 课程活动 */}
        <Box mb={4}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '17px',
              fontWeight: 600,
              color: '#1d1d1f',
              mb: 2
            }}
          >
            课程活动
          </Typography>
          <Grid container spacing={2}>
            {['english', 'language', 'art'].map((subject) => (
              <Grid item xs={12} key={subject}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 2,
                    bgcolor: 'rgba(0, 0, 0, 0.02)',
                    borderRadius: '12px'
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: '#86868b', mb: 1 }}>
                    {subject === 'english' ? '英语' : 
                     subject === 'language' ? '语言' : '美术'}活动
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ color: '#1d1d1f' }}>
                    活动内容：
                    {subject === 'english' ? '《Animal》通过系列英语游戏，沉浸式学习动物单词，了解动物知识。' :
                     subject === 'language' ? '《宋代四雅》初尝试宋代品茶茗香活动。' :
                     '《装饰邀请函》感受线描的美，尝试运用不同粗细的笔进行装饰。'}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                    {record.activities[subject].attention && 
                      <Chip label="注意力集中" size="small" />}
                    {record.activities[subject].thinking && 
                      <Chip label="积极思考" size="small" />}
                    {record.activities[subject].observation && 
                      <Chip label="仔细观察" size="small" />}
                    {record.activities[subject].cooperation && 
                      <Chip label="配合老师" size="small" />}
                    {record.activities[subject].parentInteraction && 
                      <Chip label="亲子互动" size="small" />}
                  </Box>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    参与度：{getParticipationStars(record.activities[subject].participation)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 体育活动 */}
        <Box mb={4}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '17px',
              fontWeight: 600,
              color: '#1d1d1f',
              mb: 2
            }}
          >
            体育活动
          </Typography>
          <Grid container spacing={2}>
            {['outdoor', 'exercise', 'sensoryTraining'].map((activity) => (
              <Grid item xs={12} key={activity}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 2,
                    bgcolor: 'rgba(0, 0, 0, 0.02)',
                    borderRadius: '12px'
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: '#86868b', mb: 1 }}>
                    {activity === 'outdoor' ? '户外活动' : 
                     activity === 'exercise' ? '体能训练' : '感统训练'}
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ color: '#1d1d1f' }}>
                    活动内容：
                    {activity === 'outdoor' ? '跑步关键指标：（1）20米快速跑 （2）100米绕障碍物跑。' :
                     activity === 'exercise' ? '双手抓杠悬空吊起15秒' :
                     '《支撑爬行运球》锻炼幼儿身体稳定性、上肢支撑力、增强腰腹力量。'}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {record.physicalActivities[activity].safetyAwareness && 
                      <Chip label="安全意识" size="small" />}
                    {record.physicalActivities[activity].discipline && 
                      <Chip label="遵守纪律" size="small" />}
                    {record.physicalActivities[activity].coordination && 
                      <Chip label="协调性好" size="small" />}
                    {record.physicalActivities[activity].balance && 
                      <Chip label="平衡性好" size="small" />}
                    {activity === 'sensoryTraining' && record.physicalActivities[activity].cleanupHabit && 
                      <Chip label="整理习惯好" size="small" />}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 生活自理 */}
        <Box mb={4}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '17px',
              fontWeight: 600,
              color: '#1d1d1f',
              mb: 2
            }}
          >
            生活自理
          </Typography>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2,
              bgcolor: 'rgba(0, 0, 0, 0.02)',
              borderRadius: '12px'
            }}
          >
            <Typography variant="body1" paragraph>
              {record.lifeCare.content}
            </Typography>
            <Typography variant="body1">
              表现：{record.lifeCare.status === 'independent' ? '能独立完成' :
                     record.lifeCare.status === 'needsHelp' ? '需要帮助' :
                     '需要提醒'}
            </Typography>
          </Paper>
        </Box>

        {/* 礼仪表现 */}
        <Box mb={4}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '17px',
              fontWeight: 600,
              color: '#1d1d1f',
              mb: 2
            }}
          >
            礼仪表现
          </Typography>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2,
              bgcolor: 'rgba(0, 0, 0, 0.02)',
              borderRadius: '12px'
            }}
          >
            <Typography variant="body1">
              {record.etiquette}
            </Typography>
          </Paper>
        </Box>

        {/* 底部签名 */}
        <Box 
          sx={{ 
            mt: 4, 
            pt: 3, 
            borderTop: '1px solid rgba(0, 0, 0, 0.05)',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" sx={{ color: '#86868b' }}>
            {record.recorder} · {record.date}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default DailyRecordView; 