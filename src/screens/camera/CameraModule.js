import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { CameraView, useCameraPermissions} from 'expo-camera';
import axios from 'axios';
import { useTTS } from '../../components/TTSContext';

const CameraModule = ({ navigation }) => {
	const { speech } = useTTS();
	const cameraType = 'back';
	const cameraRef = useRef(undefined);
	const [permission, setPermission] = useCameraPermissions();
	const [imageSize, setImageSize] = useState([]);
	const [previousTouchTime, setPreviousTouchTime] = useState(null);
	const previousTouchTimeRef = useRef(null);
	const index = useRef(1);

	useEffect(() => {
		previousTouchTimeRef.current = previousTouchTime;
	}, [previousTouchTime]);

	useEffect(() => {
		(async () => {
			if (permission?.granted && cameraRef.current) {
				const sizes = await cameraRef.current.getAvailablePictureSizesAsync();
				setImageSize(sizes);
			}
		})();
	}, [permission, cameraRef]);

	// 권한이 없는 경우 실행
	if (!permission) {
		return <View />;
	};
	if (!permission.granted) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleBackButton}>
						<Text style={styles.headerButton}>Back</Text>
					</TouchableOpacity>
					<Text style={styles.headerTitle}>점자랑</Text>
					<View style={styles.menuPlaceHolder}></View>
				</View>
				<View style={styles.content}>
					<Text style={{ textAlign: 'center'}}>No access to camera.</Text>
				</View>
			</SafeAreaView>
		);
	};

	// Swipe Gesture 로 탐색할 목록
	const menuList = [
		{ name: '뒤로가기', speech: () => speech('뒤로가기'), action: () => navigation.goBack() },
		{ name: '점자랑', speech: () => speech('점자랑'), action: () => speech('점자랑') },
		{ name: '촬영하기', speech: () => speech('촬영하기'), action: () => takePicture() },
	];

	// 터치 이벤트 처리
	const handlePressButton = (name) => {
		const touchedIndex = menuList.findIndex((menu) => menu.name === name);
		index.current = touchedIndex;
		menuList[touchedIndex].speech();
	};

	// 더블 터치 이벤트 처리
	const handleDoubleTouch = () => {
		const currentTouchTime = Date.now();
		const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 500;

		if (isDoubleTouched) {
			menuList[index.current].action();
		}

		previousTouchTimeRef.current = currentTouchTime;
		setPreviousTouchTime(previousTouchTimeRef.current);
	};

	// Left Swipe 이벤트 처리
	const onSwipeLeft = () => {
		index.current = (index.current - 1 + menuList.length) % menuList.length;
		menuList[index.current].speech();
	};

	// Right Swipe 이벤트 처리
	const onSwipeRight = () => {
		index.current = (index.current + 1) % menuList.length;
		menuList[index.current].speech();
	};

	// 촬영
	const takePicture = async () => {
		const currentTouchTime = Date.now();
		const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 300;

		if (isDoubleTouched) {
			const image = await cameraRef.current?.takePictureAsync();
			requestToServer(image);
		}
		else {
			const message = "촬영하기";
			speech(message);
		}
		previousTouchTimeRef.current = currentTouchTime;
		setPreviousTouchTime(previousTouchTimeRef.current);
	};

	// 서버로 전송
	const requestToServer = async (image) => {
		try {
			const url = 'http://218.150.182.161:15555/';
			let body = new FormData();
			const data = {
				uri: image.uri,
				type: 'image/jpeg',
				name: 'photo.jpg',
			};
			body.append('file', data);

			const response = await axios.post(url, body, {
				headers: { 'Content-Type': 'multipart/form-data', },
			});

			if (response.status === 200) {
                navigation.navigate('ObjectList', { data: response.data });
			}
		}
		catch (error) {
			console.error(error);
            const message = "인식에 실패했습니다.";
            speech(message);
            navigation.navigate('Home');
		}
	};

	return (
		<GestureRecognizer
			onSwipeLeft={onSwipeLeft}
			onSwipeRight={onSwipeRight}
			config={{
				velocityThreshold: 0.1,
				directionalOffsetThreshold: 80,
			}}
			style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={() => handlePressButton('뒤로가기')}>
						<Text style={styles.headerButton}>Back</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => handlePressButton('점자랑')}>
						<Text style={styles.headerTitle}>점자랑</Text>
					</TouchableOpacity>
					<View style={styles.menuPlaceHolder}></View>
				</View>
				<TouchableOpacity onPress={handleDoubleTouch} activeOpacity={1} style={{ flex: 1 }}>
					<CameraView style={styles.camera} ref={cameraRef} facing={cameraType}>
					</CameraView>
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => handlePressButton('촬영하기')}>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			</SafeAreaView>
		</GestureRecognizer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
	},
	header: {
		flexDirection: 'row',
    	justifyContent: 'space-between',
    	alignItems: 'center',
    	backgroundColor: '#000',
    	paddingHorizontal: 15,
    	paddingVertical: 15,
	},
	headerButton: {
		color: '#fff',
		fontSize: 18,
	},
	headerTitle: {
		color: '#fff',
		fontSize: 26,
		fontWeight: 'bold',
	},
	menuPlaceHolder: {
		width: 38,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		alignItems: 'center',
	},
	button: {
		backgroundColor: '#fff',
		height: 70,
		width: 70,
		borderRadius: 50,
		marginTop: 20,
		marginBottom: 20,
	},
});

export default CameraModule;