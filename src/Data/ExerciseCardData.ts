export interface ExerciseCardData {
    name: string;
    description: string;
    imageUrl: string;
    price: string;
    id: number;
    deepDescription: string;
}

const ipfsCommonCid: string = 'https://ipfs.io/ipfs/bafybeihy6y5273gu4xbks2dyfe3igcz2y5aishkvaxz26hjjrryt3ocqvu';

const exercisesBase = [
    {
        name: 'Morning Flow Starter',
        description:
            'A package designed to start your day with energy and mindfulness. Gentle sequences for muscle awakening and guided breathing.',
        deepDescription:
            'Start your mornings with intention through a curated sequence of yoga practices that blend gentle stretching, mindful breathing, and energy-balancing poses. This program is designed to gradually awaken your body and mind, promote healthy circulation, and cultivate mental clarity before diving into daily tasks. Ideal for beginners and those seeking a soft yet effective start to the day, each session helps establish a grounded and positive rhythm. Includes 3 morning sessions of 20 minutes with gentle movements to awaken the body, guided breathing, and short meditations to begin the day mindfully.',
        price: '0.01',
    },
    {
        name: 'Flex & Flow',
        description:
            "Improve your body's flexibility and fluidity with sequences combining deep stretching and dynamic vinyasa movements.",
        deepDescription:
            'This course is designed for practitioners aiming to enhance their range of motion, joint mobility, and overall body fluidity. By combining static stretches that target major muscle groups with dynamic vinyasa flows, each session encourages a full-body release. The practice emphasizes coordination, breath awareness, and progressive posture challenges, making it ideal for intermediate users or those wanting to deepen their mobility and fluid transition between movements. Features 4 sessions focused on flexibility, including deep stretches and dynamic vinyasa flows targeting hips, shoulders, and spine.',
        price: '0.02',
    },
    {
        name: 'Stress Relief Essentials',
        description:
            'A rejuvenating journey for those who need to disconnect and find balance. Includes tension release exercises and guided meditations.',
        deepDescription:
            ' This calming package is tailored for individuals experiencing mental fatigue, emotional stress, or physical tension. Through a blend of mindful movement, breathwork, and guided meditation, you’ll explore restorative postures and techniques to calm the nervous system. These sessions foster emotional balance and deep relaxation, offering a sanctuary from daily chaos while helping you develop resilience and mental clarity over time. Includes 3 relaxing sessions with movements to release tension in the neck and lower back, calming breathing techniques, and guided meditations.',
        price: '0.015',
    },
    {
        name: 'Core Yoga Power',
        description:
            'Sequences focused on strengthening the abdomen, improving posture, and enhancing both inner and outer stability.',
        deepDescription:
            'This powerful package targets your core muscles with precision and intention, reinforcing abdominal strength, lower back stability, and spinal alignment. Beyond aesthetics, these sessions improve functional core engagement, essential for balance, posture, and injury prevention. With progressive intensity and a mix of isometric holds and fluid sequences, it’s suitable for those ready to challenge themselves both physically and mentally. Offers 4 workouts focused on deep abdominal strengthening, static balance, and core-centric posture correction.',
        price: '0.025',
    },
    {
        name: 'Evening Unwind',
        description:
            'A relaxing evening practice to close your day calmly. Focus on breathing, slow stretches, and deep relaxation.',
        deepDescription:
            'Perfect for winding down after a hectic day, this package includes gentle yoga flows, meditative breathing, and long-held restorative poses designed to ease tension and prepare your body for restful sleep. Emphasis is placed on relaxation and release, guiding you into a parasympathetic state to reduce anxiety, improve sleep quality, and restore physical equilibrium. These sessions are short but deeply calming, ideal for all levels. Includes 3 evening routines of 25 minutes with slow stretches, guided relaxation, and breathing exercises to promote restful sleep.',
        price: '0.015',
    },
    {
        name: 'Balance & Focus Boost',
        description:
            'A package designed to develop physical and mental balance, ideal for improving concentration and coordination.',
        deepDescription:
            'Cultivate inner equilibrium and sharpen your mental acuity with this specialized practice. Through standing balances, breath-focused transitions, and mindful concentration techniques, this series trains both the body and mind to stay centered. By challenging your proprioception and encouraging sustained focus, you’ll improve your reaction time, coordination, and overall clarity—making it a great complement to both personal and professional performance goals. Provides 3 sessions with balance-focused postures, mental centering techniques, and standing poses that enhance coordination.',
        price: '0.026',
    },
    {
        name: 'Back Care Bundle',
        description:
            'Perfect for those who spend many hours sitting. Targeted exercises to relieve lower back pain, strengthen the back, and improve mobility.',
        deepDescription:
            'This therapeutic package addresses modern sedentary habits that contribute to back discomfort. Combining gentle mobility work, core support techniques, and posture-aligning flows, it aims to release chronic tension and build resilience in the spine. It’s ideal for office workers, drivers, or anyone seeking daily relief from stiffness. Educational guidance throughout ensures proper alignment and safe movement patterns to foster long-term back health. Offers 3 sessions with gentle movements for lumbar relief, postural exercises, and mobility drills for the spine and hips.',
        price: '0.007',
    },
    {
        name: 'Prenatal Yoga Pack',
        description:
            'A safe and gentle collection of exercises for expectant mothers, designed to support body and mind during pregnancy.',
        deepDescription:
            'Designed in collaboration with prenatal wellness specialists, this nurturing course provides pregnant individuals with the tools to support their physical comfort, emotional wellbeing, and preparation for birth. Movements are slow, grounded, and focused on breath, pelvic floor awareness, and lower back relief. Each session prioritizes safety and calm, fostering a deep connection between mother and baby while addressing pregnancy-related aches and mental stress. Includes 4 prenatal-safe sessions tailored for the second and third trimesters, with breathing work, gentle stretches, pelvic strengthening, and relaxation.',
        price: '0.005',
    },
    {
        name: 'Detox Flow Series',
        description:
            'Dynamic sequences and twists to stimulate circulation and the lymphatic system, helping the body naturally detoxify.',
        deepDescription:
            'Cleanse your system holistically with yoga sequences that emphasize spinal twists, inverted poses, and dynamic flows that stimulate digestion, lymphatic drainage, and blood flow. This package includes energizing routines that revitalize organs and support your natural detoxification pathways, helping reduce inflammation and mental fog. It’s best practiced in the morning or after hydration for maximum benefit, and includes breathwork to further assist internal cleansing. Features 3 energizing flows of 25 minutes with twists, inverted postures, and stimulating breathing to support natural detoxification.',
        price: '0.035',
    },
    {
        name: 'Yoga for Athletes',
        description:
            'A package for athletes aiming to improve flexibility, muscle recovery, and injury prevention through yoga.',
        deepDescription:
            'Specifically tailored to meet the needs of active individuals, this package enhances recovery and performance through mobility-focused sessions, fascia release, and controlled breathwork. Sessions target tight muscle groups common in various sports, support joint integrity, and educate athletes on injury prevention techniques. Whether used pre- or post-training, these yoga flows help maintain structural balance and longevity in physical activity. Includes 3 post-training yoga sessions with deep stretches, myofascial release, and recovery techniques for active bodies.',
        price: '0.045',
    },
];

const exercisesCardData: ExerciseCardData[] = exercisesBase.map((exercise, index) => ({
    ...exercise,
    imageUrl: `${ipfsCommonCid}/${index + 1}.jpg`,
    id: index + 1,
}));

export default exercisesCardData;
