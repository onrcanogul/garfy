import Header from './components/Header';
import Post from './components/Post';
import Footer from './components/Footer';

export default function App() {
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView horizontal style={styles.content}>
                <Post />
                {/* Diğer postlar buraya eklenecek */}
            </ScrollView>
            <Footer />
        </View>
    );
}