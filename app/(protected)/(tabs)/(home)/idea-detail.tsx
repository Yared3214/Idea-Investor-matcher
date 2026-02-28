import { useEntrepreneur } from "@/hooks/useEntrepreneur";
import { stageMap, startupMap } from "@/lib/utils/startupMap";
import { useStartupStore } from "@/store/startupStore";
import { FontAwesome6 } from "@expo/vector-icons";
import { formatDistanceToNow } from 'date-fns';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import RenderHTML from "react-native-render-html";

const investors = [
  {
    id: "1",
    name: "Sarah Chen",
    firm: "GreenVentures Capital",
    score: 94,
    interested: true,
    email: "sarah.chen@greenvc.com",
    funding: "$200K - $1M",
    focus: "Sustainability, CleanTech, GreenTech",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
  },
  {
    id: "2",
    name: "Michael Torres",
    firm: "Impact Ventures",
    score: 89,
    interested: false,
    funding: "$100K - $750K",
    focus: "Mobile Apps, Consumer Tech, Impact",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
  },
];

export default function IdeaDetailsScreen() {
  const startup = useStartupStore((state)=>state.selectedStartup);
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { width } = useWindowDimensions();
  const router = useRouter();


  const category = startup?.industry ? startupMap[startup?.industry].category : undefined;
  const categoryColor = startup?.industry ? startupMap[startup?.industry].categoryColor : undefined;
  const categoryBackcolor = startup?.industry ? startupMap[startup?.industry].categoryBackcolor : undefined;
  const stage = startup?.stage ? stageMap[startup?.stage].stage : undefined;

  const { getSingleStartup } = useEntrepreneur();
  
    useEffect(() => {
      const fetchStartup = async(id: string) => {
       await getSingleStartup(id);
      }
  
      if (id) fetchStartup(id);
    },[getSingleStartup, id]);

    const timeAgo = formatDistanceToNow(new Date(startup?.updatedAt || Date.now()), {
      addSuffix: true,
    });

    const handleUpdate = () => {
      if (!startup?.id) return;
      router.push({
        pathname: '/update-idea',
        params: {
          id: startup.id,
        }
      });
    };

    const { deleteIdea, loading, error } = useEntrepreneur();
    const handleDelete = () => {
      if (!startup?.id) return;
    
      Alert.alert(
        "Delete Startup",
        "Are you sure you want to delete this startup? This action cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              await deleteIdea(startup.id);
              console.error(error)
              router.back();
            },
          },
        ]
      );
    };

    
    
  return (
    <ScrollView style={styles.container}>
      {/* IDEA DETAILS */}
      <View style={styles.section}>
        <Text style={styles.title}>
          {startup?.pitchTitle}
        </Text>

        <View style={styles.statusRow}>
          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>Active</Text>
          </View>
          <Text style={styles.updatedText}>Updated {timeAgo}</Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdate}
          >
            <FontAwesome6 name="pen" size={14} color="#4F46E5" />
            <Text style={styles.updateText}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <FontAwesome6 name="trash" size={14} color="#DC2626" />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>

        {/* Industry */}
        <View style={styles.tagRow}>
        <Text style={[styles.sectionLabel, { marginTop: 0, marginBottom: 0 }]}>Industry</Text>
          <View style={[styles.tag, { backgroundColor: categoryBackcolor }]}>
            <Text style={[styles.tagText, { color: categoryColor }]}>{category}</Text>
          </View>
        </View>

        <View style={{ marginTop: 12,}}>
        <RenderHTML
          contentWidth={width}
          source={{ html: startup?.description || "" }}
          tagsStyles={{
            p: {
              fontSize: 16,
              color: "#1E293B",
              lineHeight: 24,
              marginBottom: 12,
            },
            strong: {
              fontWeight: "bold",
              color: "#111827",
            },
            em: {
              fontStyle: "italic",
            },
            h1: {
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 16,
            },
            h2: {
              fontSize: 20,
              fontWeight: "600",
              marginBottom: 12,
            },
            ul: {
              marginBottom: 12,
            },
            li: {
              marginBottom: 6,
            },
          }}
        />
        </View>

        {/* Funding + Stage */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionLabel}>Funding Needed</Text>
            <Text style={styles.boldText}>{startup?.fundingAmount.toLocaleString('en-US', { style: 'currency', currency: 'ETB' })}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionLabel}>Stage</Text>
            <Text style={styles.boldText}>{stage}</Text>
          </View>
        </View>
      </View>

      {/* MATCHED INVESTORS */}
      <View style={styles.section}>
        <Text style={styles.subTitle}>Matched Investors</Text>

        <FlatList
          data={investors}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.profileRow}>
                  <Image
                    source={{ uri: item.avatar }}
                    style={styles.avatar}
                  />
                  <View>
                    <Text style={styles.cardName}>{item.name}</Text>
                    <Text style={styles.cardFirm}>{item.firm}</Text>
                  </View>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <View style={styles.scoreBarContainer}>
                    <View
                      style={[
                        styles.scoreBar,
                        { width: `${item.score}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.scoreText}>
                    {item.score} Match
                  </Text>
                </View>
              </View>

              <Text style={styles.infoLabel}>Industry Focus</Text>
              <Text style={styles.infoText}>{item.focus}</Text>

              <Text style={styles.infoLabel}>Funding Range</Text>
              <Text style={styles.infoText}>{item.funding}</Text>

              <View style={styles.divider} />

              {item.interested ? (
                <View style={styles.interestedBox}>
                  <Text style={styles.interestedText}>
                    Interested
                  </Text>
                  <Text style={styles.emailText}>
                    {item.email}
                  </Text>
                </View>
              ) : (
                <Text style={styles.notInterestedText}>
                  Not Interested
                </Text>
              )}
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
  },
  section: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  activeBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  activeText: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "600",
  },
  updatedText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 8,
  },
  actionRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 12,
  },
  
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#EEF2FF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  
  updateText: {
    color: "#4F46E5",
    fontWeight: "600",
    fontSize: 13,
  },
  
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FEE2E2",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  
  deleteText: {
    color: "#DC2626",
    fontWeight: "600",
    fontSize: 13,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 14,
    color: "#4B5563",
  },
  row: {
    flexDirection: "row",
    marginTop: 12,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "700",
  },
  tagRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 8,
  },
  cardName: {
    fontWeight: "600",
  },
  cardFirm: {
    fontSize: 12,
    color: "#6B7280",
  },
  scoreBarContainer: {
    width: 60,
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
  },
  scoreBar: {
    height: 6,
    backgroundColor: "#22C55E",
    borderRadius: 10,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 6,
  },
  infoText: {
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 8,
  },
  interestedBox: {
    backgroundColor: "#DCFCE7",
    padding: 8,
    borderRadius: 8,
  },
  interestedText: {
    fontWeight: "600",
    color: "#166534",
  },
  emailText: {
    fontSize: 12,
    color: "#065F46",
  },
  notInterestedText: {
    color: "#6B7280",
    fontWeight: "600",
  },
});