import { Container, Typography, Box, Grid, Paper, Avatar, Divider, Button } from '@mui/material'
import { Restaurant, AccessTime, LocalDining, People, Star, ArrowForward } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      role: 'Baş Şef',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      description: '15 yıllık deneyimi ile Türk mutfağının inceliklerini modern dokunuşlarla harmanlayan şefimiz.'
    },
    {
      id: 2,
      name: 'Ayşe Kaya',
      role: 'İşletme Müdürü',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      description: 'Müşteri memnuniyetini en üst seviyede tutmak için çalışan, deneyimli işletme müdürümüz.'
    },
    {
      id: 3,
      name: 'Mehmet Demir',
      role: 'Tatlı Şefi',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      description: 'Geleneksel Türk tatlılarını modern sunumlarla hazırlayan yaratıcı şefimiz.'
    }
  ]

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          py: 8, 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
            Hakkımızda
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '700px', mx: 'auto', mb: 4 }}>
            Lezzet Durağı'nın hikayesi ve değerleri
          </Typography>
        </Container>
      </Box>

      {/* Our Story */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Restoran İç Mekan"
                sx={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: 2,
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                Hikayemiz
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Lezzet Durağı, 2010 yılında İstanbul'un kalbinde, geleneksel Türk mutfağını modern bir anlayışla sunmak amacıyla kuruldu. Kurucumuz Ahmet Yılmaz, yıllarca edindiği tecrübeyi ve ailesinden gelen tarifleri, günümüz damak zevkine uygun şekilde yorumlayarak benzersiz bir lezzet deneyimi yaratmayı hedefledi.
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Açıldığımız günden bu yana, kaliteli malzemeler, özenli hazırlık ve samimi servis anlayışımızla müşterilerimizin beğenisini kazandık. Yıllar içinde menümüzü genişlettik, mekanımızı yeniledik, ancak değişmeyen tek şey lezzet kalitemiz ve misafirperverliğimiz oldu.
              </Typography>
              <Typography variant="body1">
                Bugün, İstanbul'un en sevilen restoranlarından biri olarak, her gün yüzlerce misafirimizi ağırlıyor ve onlara unutulmaz bir deneyim sunmaktan gurur duyuyoruz.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Values */}
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 5, textAlign: 'center' }}>
            Değerlerimiz
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <Box 
                  sx={{ 
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '50%',
                    backgroundColor: 'primary.light',
                    color: 'white',
                    mb: 2
                  }}
                >
                  <LocalDining fontSize="large" />
                </Box>
                <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                  Kalite
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  En taze ve kaliteli malzemelerle, özenle hazırlanan lezzetler sunuyoruz.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <Box 
                  sx={{ 
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '50%',
                    backgroundColor: 'primary.light',
                    color: 'white',
                    mb: 2
                  }}
                >
                  <People fontSize="large" />
                </Box>
                <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                  Misafirperverlik
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Her müşterimizi ailemizin bir parçası gibi görüyor, samimi bir ortam sunuyoruz.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <Box 
                  sx={{ 
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '50%',
                    backgroundColor: 'primary.light',
                    color: 'white',
                    mb: 2
                  }}
                >
                  <Restaurant fontSize="large" />
                </Box>
                <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                  Gelenek
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Geleneksel tarifleri koruyarak, modern dokunuşlarla zenginleştiriyoruz.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <Box 
                  sx={{ 
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '50%',
                    backgroundColor: 'primary.light',
                    color: 'white',
                    mb: 2
                  }}
                >
                  <Star fontSize="large" />
                </Box>
                <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                  Mükemmellik
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Her detayda mükemmelliği arıyor, sürekli kendimizi geliştiriyoruz.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Team */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 5, textAlign: 'center' }}>
            Ekibimiz
          </Typography>
          
          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <Grid item xs={12} md={4} key={member.id}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                    <Avatar 
                      src={member.image} 
                      alt={member.name}
                      sx={{ width: 120, height: 120, mb: 2 }}
                    />
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 500 }}>
                      {member.role}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    {member.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Working Hours */}
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                Çalışma Saatlerimiz
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTime color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6" component="p">
                  Haftanın Her Günü
                </Typography>
              </Box>
              <Box sx={{ pl: 5, mb: 4 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Kahvaltı:</strong> 08:00 - 11:00
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Öğle Yemeği:</strong> 12:00 - 15:00
                </Typography>
                <Typography variant="body1">
                  <strong>Akşam Yemeği:</strong> 18:00 - 23:00
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Rezervasyon için lütfen bizi arayın veya çevrimiçi rezervasyon formunu doldurun.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                component={Link}
                to="/iletisim"
                endIcon={<ArrowForward />}
              >
                Rezervasyon Yap
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Restoran Dış Mekan"
                sx={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: 2,
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default AboutPage