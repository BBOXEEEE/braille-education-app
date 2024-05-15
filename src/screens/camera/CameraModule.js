import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
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

	const handleBackButton = () => {
		const currentTouchTime = Date.now();
		const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 300;

		if (isDoubleTouched) {
			navigation.goBack();
		}
		else {
			const message = "뒤로가기";
			speech(message);
		}
		previousTouchTimeRef.current = currentTouchTime;
		setPreviousTouchTime(previousTouchTimeRef.current);
	}

	if (!permission) {
		return <View />;
	}
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
	}

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
	}

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
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={handleBackButton}>
					<Text style={styles.headerButton}>Back</Text>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>점자랑</Text>
				<View style={styles.menuPlaceHolder}></View>
			</View>
			<CameraView style={styles.camera} ref={cameraRef} facing={cameraType}>
			</CameraView>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={takePicture}>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
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