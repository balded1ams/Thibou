import Header from "@/components/header";
import Footer from "@/components/footer";
import { useThemeContext } from "@/hooks/useTheme";
import Category from "@/components/Category";
import Item from "@/components/Item";
import Title from "@/components/title";


function App() {
    const { systemTheme } = useThemeContext();

    return (
        <div style={{
            backgroundColor: systemTheme.background.primary,
        }}>
            <main className={"max-w-5xl mx-auto flex h-full flex-col gap-4 px-4 min-h-screen"}
                  style={{
                      backgroundColor: systemTheme.background.primary,
                  }}>
                <Header/>

                <Title>Choisissez vos préferences</Title>

                {/*<CustomPage/>*/}
                <div style={{padding: "2rem", fontFamily: "Arial, sans-serif"}}>
                    <Category title="Type d'œuvre">
                        <Item name="Peinture"/>
                        <Item name="Sculpture"/>
                    </Category>
                    <Category title="Auteur">
                        <Item name="Michel-Ange"/>
                        <Item name="Léonard de Vinci"/>
                    </Category>
                    <Category title="Mouvement">
                        <Item name="Le maniérisme"/>
                        <Item name="Le baroque"/>
                        <Item name="Le romantisme"/>
                    </Category>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default App;