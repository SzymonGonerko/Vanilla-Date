import * as React from 'react';
import {useContext, useState} from "react";
import {AppContext} from "../../../../App";



import {
    Container,
    Box,
    Button,
    createTheme,
    ThemeProvider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
} from "@material-ui/core";

const theme = createTheme();




const questions = [
    ". Już od pierwszego spotkania coś nas przyciągało do siebie:",
    ". Próbuję trzymać partnera w niepewności co do mojego zaangażowania w związek:",
    ". Dopiero gdy go/ją już jakiś czas kochała, zdałam/em sobię sprawę z tej miłości:",
    ". Zanim się z kimkolwiek zwiążę, próbuję sobie wyobrazić, kim się stanie w przyszłości:",
    ". Kiedy źle się dzieje miedzy nami, dostaję rozstroju żołądka:",
    ". Próbuję własnymi siłami pomóc partnerowi/ce gdy znajdzie się w kłopotach:",
    ". Pomiędzy nami zachodzi coś w rodzaju reakcji chemicznej:",
    ". Nic się nie stanie jeżeli mój partner/ka pewnych rzeczy o mnie nie będzie wiedział/a:",
    ". Nie potrafię kogoś pokochać, jeśli najpierw nie zacznę się o tę osobę troszczyć:",
    ". Próbuję starannie zaplanować swoje życie, zanim wybiorę partnera/kę:",
    ". Kiedy zerwę związek, w którym byłem/byłam mocna zaangażowany/na wpadam w depresję:",
    ". Wolałabym sam/sama cierpieć niż pozwolić na to, by on/ona cierpiał/cierpiała:",
    ". Zwykle miłość fizyczna jest międzynami intensywna i satysfakcjonująca:",
    ". Czasami muszę uważać aby żaden z moich partnerów/ek nie dowiedział/a się o istnieniu drugiego:",
    ". Do dziś pozostaję w przyjaznych stosunkach z prawie każdym kogo kiedyś kochałem/kochałam:",
    ". Ważne jest dla mnie aby mój partner/ka podobne poglądy i doświadczenia życiowe:",
    ". Myśl o tym, że jestem zakochana/ zakochany, tak mnie pobudza, że nie mogę zasnąć:",
    ". Nie potrafię się cieszyć, dopóki mój partner/partnerka jest nieśczęśliwa:",
    ". Myślę że mój partner/partnerka jest dla mnie pprzeznaczona:",
    ". Bez trudu i szybko otrząsam się z nieudanego związku:",
    ". Uważam, że najlepsza miłoąść wyrasta z długotrwałęj przyjaźni:",
    ". Istotne jest dla mnie jak mój partner/partnerka zapatruje się na moją rodzinę:",
    ". Kiedy on/ona nie zwraca na mnie uwagi, pogarsza się moje samopoczucie fizyczne:",
    ". Poświęcę moje pragnienia, jeżeli pozwoli mu/jej zrealizować jego/jej własne:",
    ". W związku oboje szybko się zaangażowaliśmy emocjonalnie w związek:",
    ". Myślę, że mój partner/partnerka zdenerwowałby/łaby, gdyby dowiedziałby się o niektórych rzeczach, jakie robię z innymi osobami:",
    ". Trudno określić moment w jakim zakochaliśmy się w sobie:",
    ". Ważne jest dla mnie, czy okaże się on/ona dobrym ojcem/dobrą matką",
    ". Kiedy jestem zakochany/zakochana mam kłopoty z koncentracją",
    ". Mój partner/partnerka może używać według własnej chęci wszystkiego co do mnie należy:",
    ". Dobrze się rozumiemy nawzajem:",
    ". Kiedy mój partner/partnerka zbytnio się odemnie uzależny to mam ochotę się wycofać:",
    ". Miłość w rzeczywistości jest głęboką przyjaźnią, a nie jakimś mistycznym tajemnym uczuciem:",
    ". Jednym z kreytrium wyboru partnera jest to, jak się zapatruje na moją pracę zawodową:",
    ". Nie potrafię się zrelaksować, kiedy podejrzewam, że on/ona jest w dnaje chwili z kimś innym:",
    ". Nawet kiedy rozgniewa się na mnie, nadal w pełni go kocham:",
    ". Ważne jest dla mnie aby mój partner/ka pasował/ła do mojego ideału urody fizycznej:",
    ". Lubię bawić się w miłości z kilkoma partnerami",
    ". Moje najbardziej udane związki wyrastały z dobrej przyjaźni:",
    ". Zanim się z kimś zwiążę, próbuję się zorientować jakie cechy sądziedziczne w jego rodzienie, na wypadek gdybyśmy mieli dzieci:",
    ". Kiedy nie zwraca na mnie uwagi zdarza mi się robić głupie rzeczy, by odzysakć jego uwagę:",
    ". Dla Niej Niego wytrzymam wszystko:"]




const PersonalityTestForm = () => {
    const {setState} = useContext(AppContext)
    const [errors, setErrors] = useState([])
    const [isValidate, setIsValidate] = useState(false)

    const getValidate = (data, howManyQuestions) => {
        const arr = []
        for (let i = 0; i < howManyQuestions; i++) {
            if (data.get('question' + (i+1)) === null) {
                arr.push((i+1))
            } else {setIsValidate(true)}
        }
        setErrors(arr)
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        getValidate(data, 42)
        if (errors.length === 0 && isValidate) {
            // for (let i = 0; i < 42; i++) {
            //     console.log('question'+ (i+1)  ,data.get('question' + (i+1)))
            // }
            setState(prev => ({
                ...prev,
                registerPart: prev.registerPart + 1,
                personalityTestForm: {
                    question1: data.get('question1'),
                    question2: data.get('question2'),
                    question3: data.get('question3'),
                    question4: data.get('question4'),
                    question5: data.get('question5'),
                    question6: data.get('question6'),
                    question7: data.get('question7'),
                    question8: data.get('question8'),
                    question9: data.get('question9'),
                    question10: data.get('question10'),
                    question11: data.get('question11'),
                    question12: data.get('question12'),
                    question13: data.get('question13'),
                    question14: data.get('question14'),
                    question15: data.get('question15'),
                    question16: data.get('question16'),
                    question17: data.get('question17'),
                    question18: data.get('question18'),
                    question19: data.get('question19'),
                    question20: data.get('question20'),
                    question21: data.get('question21'),
                    question22: data.get('question22'),
                    question23: data.get('question23'),
                    question24: data.get('question24'),
                    question25: data.get('question25'),
                    question26: data.get('question26'),
                    question27: data.get('question27'),
                    question28: data.get('question28'),
                    question29: data.get('question29'),
                    question31: data.get('question31'),
                    question32: data.get('question32'),
                    question33: data.get('question33'),
                    question34: data.get('question34'),
                    question35: data.get('question35'),
                    question36: data.get('question36'),
                    question37: data.get('question37'),
                    question38: data.get('question38'),
                    question39: data.get('question39'),
                    question40: data.get('question40'),
                    question41: data.get('question41'),
                    question42: data.get('question42'),
                }
            }))

        }
    };



    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box  component="form" onSubmit={handleSubmit}>

                        {questions.map((el, index) => (
                            <FormControl
                                key={index}
                                margin="normal"
                                style={{border: "1px solid black", borderRadius: "5px", padding: "5px" }}
                                fullWidth>
                                    <FormLabel
                                        style={{fontSize: "1.3rem", fontFamily: 'Roboto Serif', color: (errors.some(el => el === index + 1) ? "red": null)}}
                                    >{index + 1} {el}</FormLabel>
                                        <RadioGroup
                                    name={"question" + (index +1)}
                                    margin="normal"

                                >
                                    <FormControlLabel value="1" control={<Radio />} label="nie ! " />
                                    <FormControlLabel value="2" control={<Radio />} label="raczej nie" />
                                    <FormControlLabel value="3" control={<Radio />} label="brak zdania" />
                                    <FormControlLabel value="4" control={<Radio />} label="raczej tak" />
                                    <FormControlLabel value="5" control={<Radio />} label="tak ! " />
                                </RadioGroup>
                            </FormControl>

                        ))}

                        {errors.length > 0 ? <p style={{color: "red", margin: "10px", textAlign: "center"}}>Wypełnij wszystkie pola tj. {errors.join(' , ')}</p>: null}
                        <Button
                            type="submit"
                            size="large"
                            color="primary"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Dalej
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default PersonalityTestForm