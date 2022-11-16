import { useEffect, useState } from "react";
import { HStack, Stack, useToast, VStack } from "native-base";
import { useRoute } from "@react-navigation/native"

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PoolCardProps } from "../components/PoolCard";

import { api } from "../services/api";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";

interface RouteParams {
    id: string;
}

export function Details() {
    const [isLoading, setIsLoading] = useState(true);
    const [optionSelected, setOptionSelected] = useState<'guesses' | 'raking'>('guesses');
    const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps);

    const toast = useToast();
    const route = useRoute();

    const { id } = route.params as RouteParams;

    async function fetchPoolDetails() {
        try {
            setIsLoading(true);
            const response = await api.get(`/pool/${id}`)
            setPoolDetails(response.data.pool)

        } catch (err) {
            console.log(err);

            toast.show({
                title: 'Não foi possível carregar os detalhes do bolão!',
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPoolDetails()
    }, [id]);
    
    if(isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title={id} showBackButton showShareButton/>
            {
                poolDetails._count?.participants > 0 
                ? 
                <VStack px={5} flex={1}>
                    <PoolHeader data={poolDetails}/>

                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                    <Option 
                        title="Seus palpites" 
                        isSelected={optionSelected === 'guesses'}
                        onPress={() => setOptionSelected('guesses')}
                    />
                    <Option 
                        title="Ranking do grupo" 
                        isSelected={optionSelected === 'raking'}
                        onPress={() => setOptionSelected('raking')}/>
                    </HStack>
                </VStack> 
                :
                <EmptyMyPoolList code={poolDetails.code}/>
            }
        </VStack>
    );
}